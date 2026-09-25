// Local fallback counter for the weekly publish quota, used only when the
// server-side count query is unavailable (offline, or schema not migrated yet).
// Counts per ISO calendar week (Monday 00:00 UTC) so it matches the database
// check exactly.
const QUOTA_KEY = "palettesnap_publish_quota";

// Monday of the current week as a YYYY-MM-DD string (UTC).
const utcWeekKey = (): string => {
  const now = new Date();
  const daysSinceMonday = (now.getUTCDay() + 6) % 7;
  const monday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysSinceMonday),
  );
  return monday.toISOString().slice(0, 10);
};

export const utcWeekStartISO = (): string => `${utcWeekKey()}T00:00:00.000Z`;

export const readLocalPublishCount = (): number => {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return 0;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return 0;
    const { week, count } = parsed as { week?: unknown; count?: unknown };
    if (week !== utcWeekKey() || typeof count !== "number") return 0;
    return count;
  } catch {
    return 0;
  }
};

export const bumpLocalPublishCount = (): void => {
  try {
    const next = readLocalPublishCount() + 1;
    localStorage.setItem(
      QUOTA_KEY,
      JSON.stringify({ week: utcWeekKey(), count: next }),
    );
  } catch {
    // storage unavailable - server count stays authoritative
  }
};
