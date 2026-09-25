// IDs of palettes published from THIS browser, persisted in localStorage.
// "My Creations" is device-scoped: another browser/incognito session must
// never see palettes published somewhere else.
const CREATED_IDS_KEY = "palettesnap_created_ids";

export const getCreatedIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(CREATED_IDS_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
};

export const persistCreatedIds = (ids: Set<string>): void => {
  try {
    localStorage.setItem(CREATED_IDS_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage full or unavailable - creations stay session-only
  }
};
