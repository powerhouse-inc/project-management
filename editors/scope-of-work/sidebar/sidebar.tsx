import React, { useState } from "react";
import Roadmaps from "./roadmaps.js";
import Milestones from "./milestones.js";
import Deliverables from "./deliverables.js";
import ScopeOfWork from "./scopeOfWork.js";

const SIDEBAR_OPTIONS = [
  { key: "roadmaps", label: "Roadmaps" },
  { key: "milestones", label: "Milestones" },
  { key: "deliverables", label: "Deliverables" },
];

const Sidebar = (props: any) => {
  const { dispatch, document } = props;
  const state = document.state.global;
  const roadmaps = state.roadmaps;

  const [selected, setSelected] = useState("sow");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roadmapsOpen, setRoadmapsOpen] = useState(false);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

  // Select latest roadmap by default when opening roadmaps
  React.useEffect(() => {
    if (selected === "roadmaps" && roadmaps.length > 0 && !selectedRoadmapId) {
      setSelectedRoadmapId(roadmaps[roadmaps.length - 1].id);
    }
  }, [selected, roadmaps, selectedRoadmapId]);

  // Handler for clicking a roadmap title in the sidebar
  const handleSelectRoadmap = (id: string) => {
    setSelected("roadmaps");
    setSelectedRoadmapId(id);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`flex h-full min-h-screen ${sidebarOpen ? "" : "md:w-full"}`}
    >
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-2 left-2 z-30 p-2 bg-white border border-gray-300 rounded shadow focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>

      {/* Sidebar */}
      {/* Desktop: always visible, Mobile: slide-in */}
      <div
        className={`
          bg-white border border-gray-300 flex flex-col p-2 w-64
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:z-auto md:h-auto md:relative md:block
          ${sidebarOpen ? "fixed top-0 left-0 h-screen z-40 translate-x-0" : "fixed top-0 left-0 h-screen z-40 -translate-x-full"}
          md:!relative md:!block md:!z-auto md:!h-auto md:!top-auto md:!left-auto md:!translate-x-0
        `}
        style={{
          position: undefined,
          top: undefined,
          left: undefined,
          height: undefined,
          zIndex: undefined,
          ...(window.innerWidth >= 768
            ? {
                position: "relative",
                top: "auto",
                left: "auto",
                height: "auto",
                zIndex: "auto",
                transform: "none",
              }
            : {}),
        }}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-4 md:mb-0 border-b border-gray-300">
          <button
            className={`w-full text-lg font-semibold px-2 py-2 rounded text-center transition-colors duration-150 focus:outline-none ${
              selected === "sow"
                ? "bg-white font-bold border border-gray-300"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelected("sow");
              setSidebarOpen(false);
            }}
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            Scope of Work
          </button>
          <button
            className="md:hidden p-2 ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {/* Roadmaps button with expandable subsection */}
          <div>
            <button
              className={`text-left px-4 py-2 rounded border border-gray-300 transition-colors duration-150 w-full ${
                selected === "roadmaps"
                  ? "bg-white font-bold"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => {
                setRoadmapsOpen((open) => !open);
                setSelected("roadmaps");
                if (roadmaps.length > 0 && !selectedRoadmapId) {
                  setSelectedRoadmapId(roadmaps[roadmaps.length - 1].id);
                }
                setSidebarOpen(false);
              }}
            >
              Roadmaps
            </button>
            {/* Subsection for roadmap titles */}
            {roadmapsOpen && roadmaps.length > 0 && (
              <div className="ml-4 mt-1 flex flex-col gap-1">
                {roadmaps.map((roadmap: any) => (
                  <button
                    key={roadmap.id}
                    className={`text-left px-3 py-1 rounded transition-colors duration-150 border border-gray-200 focus:outline-none text-sm ${
                      selectedRoadmapId === roadmap.id
                        ? "bg-blue-100 font-bold border-blue-400"
                        : "bg-gray-50 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSelectRoadmap(roadmap.id)}
                  >
                    {roadmap.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Milestones and Deliverables buttons */}
          <button
            className={`text-left px-4 py-2 rounded border border-gray-300 transition-colors duration-150 ${
              selected === "milestones"
                ? "bg-white font-bold"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelected("milestones");
              setSidebarOpen(false);
            }}
          >
            Milestones
          </button>
          <button
            className={`text-left px-4 py-2 rounded border border-gray-300 transition-colors duration-150 ${
              selected === "deliverables"
                ? "bg-white font-bold"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelected("deliverables");
              setSidebarOpen(false);
            }}
          >
            Deliverables
          </button>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 ml-2 md:ml-4 w-full">
        {selected === "sow" && <ScopeOfWork {...props} />}
        {selected === "roadmaps" && selectedRoadmapId && (
          <Roadmaps roadmaps={roadmaps.filter((r: any) => r.id === selectedRoadmapId)} />
        )}
        {selected === "milestones" && <Milestones />}
        {selected === "deliverables" && <Deliverables />}
      </div>
    </div>
  );
};

export default Sidebar;
