import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { getDeviceId } from "../utils/deviceId"; //  path updated
import { MOCK_PALETTES } from "../data/mockPalettes";

export type FilterItem = {
  id: string;
  label: string;
  type: "color" | "collection";
  colorHex?: string;
};

export interface Palette {
  id: string;
  colors: string[];
  likes: number;
  isLiked: boolean;
  tags: string[];
  date: string;
  isUserCreated?: boolean;
}

type View =
  | "new"
  | "popular"
  | "random"
  | "collection"
  | "creations"
  | "detail"
  | "create"
  | "tagged"
  | "about"
  | "terms"
  | "privacy"
  | "notFound";

export interface AppState {
  currentView: View;
  activeTags: string[];
  searchText: string;
  selectedFilters: FilterItem[];
  palettes: Palette[];
  randomPalettes: Palette[];
  likedPaletteIds: Set<string>;
  selectedPaletteId: string | null;
  isLoading: boolean;
  isHydrated: boolean;
  _loadingToken: number;

  setView: (view: View) => void;
  toggleActiveTag: (tag: string) => void;
  setActiveTags: (tags: string[]) => void;
  _syncActiveTagsFromURL: (tags: string[]) => void;
  setSearchText: (text: string) => void;
  toggleFilter: (filter: FilterItem) => void;
  clearFilters: () => void;
  toggleLike: (id: string) => void;
  selectPalette: (id: string | null) => void;
  setSelectedFilters: (filters: FilterItem[]) => void;
  setHydrated: (hydrated: boolean) => void;
  addPalette: (palette: Palette) => void;
  fetchPalettes: () => Promise<void>;

  getLikedPalettes: () => Palette[];
  getCurrentPalettes: () => Palette[];
}

const LOADER_DURATION_MS = 300;
const deviceId = getDeviceId();

export const useStore = create<AppState>((set, get) => {
  const withLoader = (mutate: () => Partial<AppState>) => {
    const token = ++(get()._loadingToken as number);
    set({ isLoading: true });
    setTimeout(() => {
      if (get()._loadingToken === token) {
        set({ ...mutate(), isLoading: false });
      }
    }, LOADER_DURATION_MS);
  };

  return {
    currentView: "new",
    activeTags: [],
    searchText: "",
    selectedFilters: [],
    palettes: [],
    randomPalettes: [],
    likedPaletteIds: new Set(),
    selectedPaletteId: null,
    isLoading: false,
    isHydrated: false,
    _loadingToken: 0,

    fetchPalettes: async () => {
      const [
        { data: paletteRows, error: pErr },
        { data: likeRows, error: lErr },
      ] = await Promise.all([
        supabase
          .from("palettes")
          .select("*")
          .order("created_at", { ascending: false })
          .order("id", { ascending: true }),
        supabase.from("likes").select("palette_id").eq("device_id", deviceId),
      ]);

      if (pErr || lErr) {
        console.error("Failed to load palettes/likes:", pErr || lErr);
        set({ palettes: MOCK_PALETTES, isHydrated: true });
        return;
      }

      const likedIds = new Set((likeRows || []).map((r) => r.palette_id));

      const palettes: Palette[] = (paletteRows || []).map((row) => ({
        id: row.id,
        colors: row.colors,
        tags: row.tags,
        likes: row.likes,
        isLiked: likedIds.has(row.id),
        date: formatDate(row.created_at),
        isUserCreated: row.is_user_created,
      }));

      set({ palettes, likedPaletteIds: likedIds, isHydrated: true });
    },

    setView: (view) => {
      const state = get();
      let newState: Partial<AppState> = {
        currentView: view,
        selectedPaletteId: null,
        activeTags: [],
      };
      if (
        ["new", "popular", "random", "collection", "creations"].includes(view)
      ) {
        newState.activeTags = [];
        newState.searchText = "";
        newState.selectedFilters = [];
      }
      if (view === "random") {
        const shuffled = [...state.palettes].sort(() => Math.random() - 0.5);
        newState = { ...newState, randomPalettes: shuffled };
      }
      withLoader(() => newState);
    },

    toggleActiveTag: (tag) => {
      const state = get();
      const currentTags = state.activeTags || [];
      const exists = currentTags.some(
        (t) => t.toLowerCase() === tag.toLowerCase(),
      );
      const newTags = exists
        ? currentTags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...currentTags, tag];
      withLoader(() => ({
        activeTags: newTags,
        currentView: newTags.length > 0 ? "tagged" : "new",
        selectedPaletteId: null,
      }));
    },

    // Used when the USER picks a tag (sidebar/search)
    // changes the view too.
    setActiveTags: (tags) => {
      withLoader(() => ({
        activeTags: tags,
        currentView: tags.length > 0 ? "tagged" : "new",
        selectedPaletteId: null,
      }));
    },

    //  used only by URL - Store sync. Updates activeTags without
    // touching currentView or selectedPaletteId - the URL sync effect
    // already decides the correct view from the actual path segments,
    // so this must not override that decision (this was the bug: the
    // old code reused setActiveTags here, which force-reset currentView
    // to "new" and nulled selectedPaletteId right after selectPalette
    // had just set them correctly).
    _syncActiveTagsFromURL: (tags) => set({ activeTags: tags }),

    setSearchText: (text) => {
      withLoader(() => ({ searchText: text, selectedPaletteId: null }));
    },

    toggleFilter: (filter) => {
      const state = get();
      const exists = state.selectedFilters.some((f) => f.id === filter.id);
      const newFilters = exists
        ? state.selectedFilters.filter((f) => f.id !== filter.id)
        : [...state.selectedFilters, filter];
      withLoader(() => ({
        selectedFilters: newFilters,
        selectedPaletteId: null,
      }));
    },

    setSelectedFilters: (filters) =>
      set({ selectedFilters: filters, selectedPaletteId: null }),

    clearFilters: () => {
      withLoader(() => ({
        selectedFilters: [],
        searchText: "",
        activeTags: [],
        currentView: "new",
        selectedPaletteId: null,
      }));
    },

    setHydrated: (hydrated) => set({ isHydrated: hydrated }),

    toggleLike: (id) => {
      const state = get();
      const isCurrentlyLiked = state.likedPaletteIds.has(id);
      const paletteIndex = state.palettes.findIndex((p) => p.id === id);
      if (paletteIndex === -1) return;

      const newSet = new Set(state.likedPaletteIds);
      const updatedPalettes = [...state.palettes];
      const target = updatedPalettes[paletteIndex];

      if (isCurrentlyLiked) {
        newSet.delete(id);
        updatedPalettes[paletteIndex] = {
          ...target,
          isLiked: false,
          likes: target.likes - 1,
        };
      } else {
        newSet.add(id);
        updatedPalettes[paletteIndex] = {
          ...target,
          isLiked: true,
          likes: target.likes + 1,
        };
      }

      set({ likedPaletteIds: newSet, palettes: updatedPalettes });

      // Async sync - wrapped in try/catch to prevent unhandled rejections
      (async () => {
        try {
          if (isCurrentlyLiked) {
            await supabase
              .from("likes")
              .delete()
              .eq("device_id", deviceId)
              .eq("palette_id", id);
            await supabase
              .from("palettes")
              .update({ likes: target.likes - 1 })
              .eq("id", id);
          } else {
            await supabase
              .from("likes")
              .insert({ device_id: deviceId, palette_id: id });
            await supabase
              .from("palettes")
              .update({ likes: target.likes + 1 })
              .eq("id", id);
          }
        } catch (error) {
          console.error("Failed to sync like:", error);
          // The UI already reflects the change, so we don't need to revert.
          // Logging the error is enough for debugging.
        }
      })();
    },

    addPalette: (newPalette: Palette) => {
      set((state) => ({
        palettes: [{ ...newPalette, isUserCreated: true }, ...state.palettes],
      }));

      (async () => {
        const { error } = await supabase.from("palettes").insert({
          id: newPalette.id,
          colors: newPalette.colors,
          tags: newPalette.tags,
          likes: 0,
          is_user_created: true,
        });
        if (error) console.error("Failed to publish palette:", error);
      })();
    },

    selectPalette: (id) => {
      withLoader(() => ({
        selectedPaletteId: id,
        currentView: id ? "detail" : "new",
      }));
    },

    getLikedPalettes: () => {
      const { palettes, likedPaletteIds } = get();
      return palettes.filter((p) => likedPaletteIds.has(p.id)).reverse();
    },

    getCurrentPalettes: () => {
      const {
        palettes,
        currentView,
        randomPalettes,
        selectedFilters,
        searchText,
        activeTags,
      } = get();
      let result = currentView === "random" ? randomPalettes : palettes;

      if (currentView === "creations") {
        result = result.filter((p) => p.isUserCreated === true);
      }
      if (activeTags && activeTags.length > 0) {
        const lowerTags = activeTags.map((t) => t.toLowerCase());
        result = result.filter((p) =>
          lowerTags.every((tag) => p.tags.some((t) => t.toLowerCase() === tag)),
        );
      }
      if (searchText.trim() !== "") {
        const lowerQuery = searchText.toLowerCase();
        result = result.filter(
          (p) =>
            p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
            p.colors.some((color) =>
              color.toLowerCase().includes(lowerQuery),
            ) ||
            p.id.toLowerCase().includes(lowerQuery),
        );
      }
      if (selectedFilters.length > 0) {
        result = result.filter((p) =>
          selectedFilters.every((filter) => {
            const lowerLabel = filter.label.toLowerCase();
            if (filter.type === "color") {
              return (
                p.tags.some((t) => t.toLowerCase() === lowerLabel) ||
                (filter.colorHex && p.colors.includes(filter.colorHex))
              );
            } else if (filter.type === "collection") {
              return p.tags.some((t) => t.toLowerCase() === lowerLabel);
            }
            return false;
          }),
        );
      }
      if (currentView === "collection") {
        const likedIds = get().likedPaletteIds;
        result = result.filter((p) => likedIds.has(p.id));
      }
      if (currentView === "popular") {
        result = [...result].sort((a, b) => b.likes - a.likes);
      }
      return result;
    },
  };
});

function formatDate(isoString: string): string {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Just now";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}
