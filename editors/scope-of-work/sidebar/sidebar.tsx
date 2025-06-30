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

const Sidebar = () => {
  const [selected, setSelected] = useState("sow");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          {SIDEBAR_OPTIONS.map((option) => (
            <button
              key={option.key}
              className={`text-left px-4 py-2 rounded border border-gray-300 transition-colors duration-150 ${
                selected === option.key
                  ? "bg-white font-bold"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
              onClick={() => {
                setSelected(option.key);
                setSidebarOpen(false); // close sidebar on mobile after selection
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 ml-2 md:ml-4 w-full">
        {selected === "sow" && <ScopeOfWork />}
        {selected === "roadmaps" && <Roadmaps />}
        {selected === "milestones" && <Milestones />}
        {selected === "deliverables" && <Deliverables />}
      </div>
    </div>
  );
};

export default Sidebar;
