import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useStore, FilterItem } from "../store/useStore";
import { COLOR_FILTERS, TAG_FILTERS } from "../data/filters";

const ALL_FILTERS = [...COLOR_FILTERS, ...TAG_FILTERS];

export const useSyncWithURL = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    currentView,
    activeTags,
    searchText,
    selectedFilters,
    selectedPaletteId,
    setView,
    _syncActiveTagsFromURL,
    setSearchText,
    setSelectedFilters,
    selectPalette,
  } = useStore();

  // Effect 1: URL -> Store
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const q = searchParams.get("q") || "";
    const filterIds =
      searchParams.get("filters")?.split(",").filter(Boolean) || [];

    let newView: any = "notFound";
    let newActiveTags: string[] | null = null;
    let newSelectedId: string | null = null;

    if (
      pathSegments.length === 0 ||
      (pathSegments[0] === "palettes" && pathSegments[1] === "new")
    ) {
      newView = "new";
    } else if (
      pathSegments[0] === "palettes" &&
      pathSegments[1] === "popular"
    ) {
      newView = "popular";
    } else if (pathSegments[0] === "palettes" && pathSegments[1] === "random") {
      newView = "random";
    } else if (pathSegments[0] === "palettes" && pathSegments[1]) {
      newView = "tagged";
      newActiveTags = pathSegments[1].split("+");
    } else if (pathSegments[0] === "collection") {
      newView = "collection";
    } else if (pathSegments[0] === "creations") {
      newView = "creations";
    } else if (pathSegments[0] === "palette" && pathSegments[1]) {
      newView = "detail";
      newSelectedId = pathSegments[1];
    } else if (pathSegments[0] === "create") {
      newView = "create";
    } else if (pathSegments[0] === "about") {
      newView = "about";
    } else if (pathSegments[0] === "terms") {
      newView = "terms";
    } else if (pathSegments[0] === "privacy") {
      newView = "privacy";
    }

    const filtersFromURL = filterIds
      .map((id) => ALL_FILTERS.find((f) => f.id === id))
      .filter(Boolean) as FilterItem[];

    if (currentView !== newView) setView(newView);

    const currentTagsStr = [...activeTags].sort().join(",");
    const newTagsStr = [...(newActiveTags || [])].sort().join(",");
    if (currentTagsStr !== newTagsStr) {
      _syncActiveTagsFromURL(newActiveTags || []);
    }

    if (selectedPaletteId !== newSelectedId) selectPalette(newSelectedId);
    if (searchText !== q) setSearchText(q);

    const currentIds = selectedFilters
      .map((f) => f.id)
      .sort()
      .join(",");
    const urlIds = filtersFromURL
      .map((f) => f.id)
      .sort()
      .join(",");
    if (currentIds !== urlIds) {
      setSelectedFilters(filtersFromURL);
    }

    // ❌ REMOVED: setHydrated(true) - fetchPalettes handles this
  }, [location.pathname, searchParams]);

  // Effect 2: Store -> URL
  useEffect(() => {
    let path = "/";

    if (currentView === "new") {
      path = "/";
    } else if (currentView === "popular") {
      path = "/palettes/popular";
    } else if (currentView === "random") {
      path = "/palettes/random";
    } else if (currentView === "tagged" && activeTags.length > 0) {
      path = `/palettes/${activeTags.join("+")}`;
    } else if (currentView === "collection") {
      path = "/collection";
    } else if (currentView === "creations") {
      path = "/creations";
    } else if (currentView === "detail" && selectedPaletteId) {
      path = `/palette/${selectedPaletteId}`;
    } else if (currentView === "create") {
      path = "/create";
    } else if (currentView === "about") {
      path = "/about";
    } else if (currentView === "terms") {
      path = "/terms";
    } else if (currentView === "privacy") {
      path = "/privacy";
    }

    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (selectedFilters.length > 0) {
      params.set("filters", selectedFilters.map((f) => f.id).join(","));
    }

    const queryString = params.toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;

    if (
      currentView !== "notFound" &&
      window.location.pathname + window.location.search !== fullPath
    ) {
      navigate(fullPath, { replace: true });
    }
  }, [
    currentView,
    activeTags,
    selectedPaletteId,
    searchText,
    selectedFilters,
    navigate,
  ]);
};
