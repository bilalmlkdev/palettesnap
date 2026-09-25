// Local fallback counter for the daily publish quota, used only when the
// server-side count query is unavailable (offline, or schema not migrated yet).
// Counts per UTC day so it matches the database check exactly.
const QUOTA_KEY = "palettesnap_publish_quota";

const utcDayKey = (): string => new Date().toISOString().slice(0, 10);

export const utcDayStartISO = (): string => `${utcDayKey()}T00:00:00.000Z`;

export const readLocalPublishCount = (): number => {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return 0;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return 0;
    const { day, count } = parsed as { day?: unknown; count?: unknown };
    if (day !== utcDayKey() || typeof count !== "number") return 0;
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
      JSON.stringify({ day: utcDayKey(), count: next }),
    );
  } catch {
    // storage unavailable - server count stays authoritative
  }
};
