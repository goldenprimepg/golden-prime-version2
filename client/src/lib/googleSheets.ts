import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  type User,
} from "firebase/auth";
import firebaseConfig from "../../../firebase-applet-config.json";

export const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
];

const app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
for (const scope of SCOPES) {
  provider.addScope(scope);
}

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Firebase Auth");
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export type SheetTabPayload = {
  name: string;
  rows: Record<string, string | number | boolean | null>[];
};

function sanitizeSheetTitle(name: string, index: number): string {
  const cleaned = name.replace(/[\\/?*[\]:]/g, " ").trim().slice(0, 95);
  return cleaned || `Sheet ${index + 1}`;
}

function buildValuesGrid(rows: Record<string, string | number | boolean | null>[]): (string | number | boolean)[][] {
  if (rows.length === 0) {
    return [["No matching records for the selected filters"]];
  }
  const headers = Array.from(new Set(rows.flatMap(row => Object.keys(row))));
  return [
    headers,
    ...rows.map(row =>
      headers.map(header => {
        const value = row[header];
        return value === null || value === undefined ? "" : value;
      })
    ),
  ];
}

export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1]! : trimmed;
}

export async function getSpreadsheetMetadata(spreadsheetId: string): Promise<{
  spreadsheetId: string;
  title: string;
  spreadsheetUrl: string;
  sheetTitles: string[];
}> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Please sign in with Google before accessing Google Sheets.");
  }

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets.properties.title`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.error?.message || `Failed to read Google Sheet (${res.status}).`);
  }

  const data = await res.json();
  const sheetTitles = Array.isArray(data.sheets)
    ? data.sheets.map((s: { properties?: { title?: string } }) => s.properties?.title).filter(Boolean)
    : [];

  return {
    spreadsheetId: data.spreadsheetId,
    title: data.properties?.title ?? "Untitled spreadsheet",
    spreadsheetUrl: data.spreadsheetUrl ?? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    sheetTitles,
  };
}

export async function createGoogleSpreadsheet(
  title: string,
  sheets: SheetTabPayload[]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; title: string }> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Please sign in with Google before creating a Google Sheet.");
  }

  const normalizedSheets = (sheets.length > 0 ? sheets : [{ name: "Summary", rows: [] }]).map((sheet, index) => ({
    title: sanitizeSheetTitle(sheet.name, index),
    values: buildValuesGrid(sheet.rows),
  }));

  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: { title },
      sheets: normalizedSheets.map((sheet, index) => ({
        properties: {
          title: sheet.title,
          index,
          gridProperties: { frozenRowCount: 1 },
        },
      })),
    }),
  });

  if (!createRes.ok) {
    const errBody = await createRes.json().catch(() => null);
    throw new Error(errBody?.error?.message || `Could not create Google Sheet (${createRes.status}).`);
  }

  const created = await createRes.json();
  const spreadsheetId: string = created.spreadsheetId;

  const valueUpdateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data: normalizedSheets.map(sheet => ({
          range: `'${sheet.title.replace(/'/g, "''")}'!A1`,
          values: sheet.values,
        })),
      }),
    }
  );

  if (!valueUpdateRes.ok) {
    const errBody = await valueUpdateRes.json().catch(() => null);
    throw new Error(errBody?.error?.message || `Created spreadsheet, but failed to write rows (${valueUpdateRes.status}).`);
  }

  return {
    spreadsheetId,
    spreadsheetUrl: created.spreadsheetUrl ?? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    title: created.properties?.title ?? title,
  };
}

export async function syncToExistingSpreadsheet(
  spreadsheetId: string,
  sheets: SheetTabPayload[]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; title: string }> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Please sign in with Google before updating a Google Sheet.");
  }

  const metadata = await getSpreadsheetMetadata(spreadsheetId);
  const existingTitles = new Set(metadata.sheetTitles);
  const normalizedSheets = (sheets.length > 0 ? sheets : [{ name: "Summary", rows: [] }]).map((sheet, index) => ({
    title: sanitizeSheetTitle(sheet.name, index),
    values: buildValuesGrid(sheet.rows),
  }));

  const missingSheets = normalizedSheets.filter(sheet => !existingTitles.has(sheet.title));
  if (missingSheets.length > 0) {
    const batchRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}:batchUpdate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: missingSheets.map(sheet => ({
            addSheet: {
              properties: {
                title: sheet.title,
                gridProperties: { frozenRowCount: 1 },
              },
            },
          })),
        }),
      }
    );

    if (!batchRes.ok) {
      const errBody = await batchRes.json().catch(() => null);
      throw new Error(errBody?.error?.message || `Could not add missing tabs to Google Sheet (${batchRes.status}).`);
    }
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values:batchClear`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ranges: normalizedSheets.map(sheet => `'${sheet.title.replace(/'/g, "''")}'!A1:ZZ10000`),
      }),
    }
  );

  const valueUpdateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data: normalizedSheets.map(sheet => ({
          range: `'${sheet.title.replace(/'/g, "''")}'!A1`,
          values: sheet.values,
        })),
      }),
    }
  );

  if (!valueUpdateRes.ok) {
    const errBody = await valueUpdateRes.json().catch(() => null);
    throw new Error(errBody?.error?.message || `Could not update Google Sheet values (${valueUpdateRes.status}).`);
  }

  return {
    spreadsheetId: metadata.spreadsheetId,
    spreadsheetUrl: metadata.spreadsheetUrl,
    title: metadata.title,
  };
}
