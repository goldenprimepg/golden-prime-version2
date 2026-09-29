import { describe, expect, it } from "vitest";
import { authenticatePhonePassword, hashPassword, normalizePhone, toSafeUser, verifyPassword } from "./auth";
import { getBuildingSnapshot, listBuildingsForUser } from "./db";

describe("phone-password authentication", () => {
  it("normalizes common phone number formats to a ten-digit login key", () => {
    expect(normalizePhone("+91 99906 36862")).toBe("9990636862");
    expect(normalizePhone("7668992940")).toBe("7668992940");
  });

  it("verifies only the matching password against a salted scrypt hash", () => {
    const storedHash = hashPassword("test-password");
    expect(verifyPassword("test-password", storedHash)).toBe(true);
    expect(verifyPassword("incorrect-password", storedHash)).toBe(false);
  });

  it("strips password hashes from users returned to the client", () => {
    const safeUser = toSafeUser({ id: 1, openId: "phone:1", name: "Test", email: null, phone: "9999999999", passwordHash: "private", loginMethod: "phone-password", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() });
    expect(safeUser).not.toHaveProperty("passwordHash");
  });

  it("authenticates Owner, Manager, Shashank, and Tanu with exact credentials and rejects wrong passwords", async () => {
    const owner = await authenticatePhonePassword("9990636862", "Kapil@yadav");
    expect(owner?.role).toBe("admin");

    const manager = await authenticatePhonePassword("7668992940", "Shivam@sharma");
    expect(manager?.role).toBe("manager");

    const shashank = await authenticatePhonePassword("6307500844", "Shivam@rajput");
    expect(shashank?.role).toBe("tenant");
    expect(shashank?.name).toBe("Shashank");

    const tanu = await authenticatePhonePassword("8081368879", "Nistha@singh");
    expect(tanu?.role).toBe("tenant");
    expect(tanu?.name).toBe("Tanu");

    const byUsername = await authenticatePhonePassword("Shivam Sharma", "Shivam@sharma");
    expect(byUsername?.id).toBe(manager?.id);

    const wrongPass = await authenticatePhonePassword("9990636862", "wrong-password");
    expect(wrongPass).toBeNull();

    const buildings = await listBuildingsForUser(manager!);
    expect(buildings.length).toBeGreaterThanOrEqual(1);
    const goldenPrime = buildings.find(b => b.name === "GOLDEN PRIME PG") ?? buildings[0]!;
    expect(goldenPrime.electricityRatePaise).toBe(1200);

    const snapshot = await getBuildingSnapshot(goldenPrime.id);
    const tenantNames = snapshot.tenants.map(t => t.fullName).sort();
    expect(tenantNames).toEqual(["Mansi", "Neelam", "Nimmi", "Rahul", "Shashank", "Tanu"]);
    expect(snapshot.electricity).toHaveLength(1);
    expect(snapshot.electricity[0]?.billingMonth).toBe("2026-08");
    expect(snapshot.electricity[0]?.previousReading).toBe(491);
    expect(snapshot.electricity[0]?.currentReading).toBe(672);
    expect(snapshot.electricity[0]?.unitsConsumed).toBe(181);
    expect(snapshot.electricity[0]?.billAmountPaise).toBe(217200);
  });
});

