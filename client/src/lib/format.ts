export function formatCurrency(paise: number | null | undefined) {
  const amount = Number(paise ?? 0);
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(safe / 100);
}

export function toPaise(value: string | number | null | undefined) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.round(numeric * 100) : 0;
}

export function fromPaise(value: number | null | undefined) {
  const numeric = Number(value ?? 0);
  return (Number.isFinite(numeric) ? numeric / 100 : 0).toFixed(2);
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  try {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return typeof value === "string" ? value : "—";
    return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
  } catch {
    return typeof value === "string" ? value : "—";
  }
}

export function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}
