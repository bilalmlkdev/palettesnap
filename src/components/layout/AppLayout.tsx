import { useState } from "react";
import { useStore } from "../../store/useStore";
import LeftSidebar from "./LeftSidebar";
import CenterPanel from "./CenterPanel";
import RightSidebar from "./RightSidebar";
import SearchBar from "../center/SearchBar";
import TopLoader from "./TopLoader";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { scrollContainerRef } from "../../hooks/useScrollToTop";
import { Palette, Search, SlidersHorizontal, X } from "lucide-react";

function AppLayout() {
  const { currentView, setView, isLoading } = useStore(); // pulled isLoading for spin
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const isCreateView = currentView === "create";
  const isFullScreenView = [
    "create",
    "about",
    "terms",
    "privacy",
    "notFound",
  ].includes(currentView);

  return (
    <div className="flex flex-col h-screen bg-white text-zinc-900">
      <TopLoader />

      <header className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-15 border-b border-zinc-200 flex-shrink-0 sticky top-0 z-50 bg-white">
        <div className="flex items-center flex-shrink-0 mr-2 sm:mr-6 md:mr-10">
          <button
            onClick={() => {
              setView("new");
              setMobileSearchOpen(false);
              setMobileFiltersOpen(false);
            }}
            className="flex items-center gap-1.5 sm:gap-2 group"
          >
            <span className="text-[17px] sm:text-[22px] leading-none tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
              <em className="not-italic italic">PaletteSnap</em>
            </span>
            {/* Logo now spins whenever isLoading is true */}
            <span
              className={`relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${
                isLoading ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "0.6s" }}
            >
              <svg
                height="100%"
                width="100%"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.249,147.146C8.705,180.182,0,217.072,0,256c0,16.112,1.504,31.871,4.352,47.158h175.91L24.249,147.146z"
                  fill="#FF4D4D"
                />
                <path
                  d="M401.148,45.118L277.845,168.421h218.776C478.279,118.04,444.56,75.057,401.148,45.118z"
                  fill="#FF9F43"
                />
                <path
                  d="M507.649,208.842H331.881l155.88,155.993C503.299,331.804,512,294.92,512,256 C512,239.888,510.496,224.129,507.649,208.842z"
                  fill="#FECA57"
                />
                <path
                  d="M45.118,110.853l123.303,123.302V15.379C118.039,33.721,75.055,67.44,45.118,110.853z"
                  fill="#00D2D3"
                />
                <path
                  d="M147.146,487.751C180.182,503.296,217.072,512,256,512c16.112,0,31.871-1.505,47.158-4.351V331.74L147.146,487.751z"
                  fill="#0ABDE3"
                />
                <path
                  d="M343.579,277.845v218.776c50.382-18.342,93.366-52.061,123.303-95.474L343.579,277.845z"
                  fill="#A29BFE"
                />
                <path
                  d="M15.379,343.579c18.342,50.381,52.061,93.365,95.473,123.303l123.303-123.303H15.379z"
                  fill="#FD79A8"
                />
                <path
                  d="M256,0c-16.112,0-31.871,1.505-47.158,4.352V180.26L364.854,24.249C331.818,8.704,294.928,0,256,0z"
                  fill="#6C5CE7"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Desktop search - unchanged position/behavior */}
        <div className="flex-1 max-w-[885px] relative md:right-15 hidden md:block">
          {!isFullScreenView && <SearchBar />}
        </div>

        <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0 flex-1 md:flex-none">
          {/* Mobile-only: search toggle */}
          {!isFullScreenView && (
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                mobileSearchOpen ? "bg-zinc-200" : "hover:bg-zinc-100"
              }`}
              aria-label="Search"
            >
              {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          )}

          {/* Mobile-only: filters/tags drawer toggle */}
          {!isCreateView && !isFullScreenView && (
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Filters"
            >
              <SlidersHorizontal size={18} />
            </button>
          )}

          {!isCreateView && (
            <button
              onClick={() => setView("create")}
              className="flex items-center justify-center gap-1.5 border border-zinc-200 text-black rounded-[9px] px-2.5 md:w-[150px] md:pl-3 md:pr-4 py-2 h-9 text-[13.5px] font-medium hover:bg-zinc-100/80 transition-colors md:relative md:right-26"
            >
              <Palette size={17} />
              <span className="hidden md:inline">Create Palette</span>
            </button>
          )}
          <ThreeDotsMenu />
        </div>
      </header>

      {/* Mobile search bar - slides open under the header */}
      {mobileSearchOpen && !isFullScreenView && (
        <div className="md:hidden px-3 py-2.5 border-b border-zinc-200 bg-white">
          <SearchBar />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop sidebar - unchanged */}
        {!isCreateView && !isFullScreenView && (
          <div className="w-48 flex-shrink-0 h-full overflow-y-auto pl-4 pr-2 pb-2 pt-3 hidden lg:block">
            <LeftSidebar />
          </div>
        )}

        {/* Mobile filters drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative w-64 max-w-[80vw] h-full bg-white p-4 pt-5 overflow-y-auto shadow-xl animate-in slide-in-from-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-zinc-900 uppercase tracking-wide">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-100"
                >
                  <X size={16} />
                </button>
              </div>
              <LeftSidebar />
            </div>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className={`flex-1 h-full overflow-y-auto ${
            isFullScreenView ? "" : "px-3 md:pl-8 md:pr-10 py-2"
          }`}
        >
          <CenterPanel />
        </div>

        {!isCreateView &&
          !isFullScreenView &&
          currentView !== "collection" &&
          currentView !== "creations" && (
            <div className="w-80 flex-shrink-0 h-full overflow-y-auto pt-3 pb-0 hidden lg:block">
              <RightSidebar />
            </div>
          )}
      </div>
    </div>
  );
}

export default AppLayout;
