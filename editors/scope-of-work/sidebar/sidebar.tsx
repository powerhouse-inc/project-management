import {
  SidebarProvider,
  Sidebar,
  IconName,
  Icon,
  useSidebar,
} from "@powerhousedao/document-engineering";
import { ReactElement, useState, useEffect, useMemo } from "react";
import ScopeOfWork from "./scopeOfWork.js";
import Roadmaps from "./roadmaps.js";

type SidebarNode = {
  id: string;
  title: string;
  children: SidebarNode[];
  icon?: IconName | ReactElement;
  expandedIcon?: IconName | ReactElement;
  status?: NodeStatus;
};
enum NodeStatus {
  CREATED = "CREATED",
  MODIFIED = "MODIFIED",
  REMOVED = "REMOVED",
  MOVED = "MOVED",
  DUPLICATED = "DUPLICATED",
  UNCHANGED = "UNCHANGED", // default status, no need to set it
}

// Custom hook to track sidebar width changes
const useSidebarWidth = () => {
  const [sidebarWidth, setSidebarWidth] = useState(300); // default width
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      const width = getComputedStyle(document.documentElement)
        .getPropertyValue("--sidebar-width")
        .trim();

      if (width) {
        const widthValue = parseInt(width);
        setSidebarWidth(widthValue);
        setIsSidebarOpen(widthValue > 8); // sidebar is collapsed when width is 8px
      }
    };

    // Initial update
    updateWidth();

    // Listen for sidebar resize events
    const handleResize = () => updateWidth();
    const handleResizeActive = () => updateWidth();
    const handleToggle = () => updateWidth();

    document.addEventListener("sidebar:resize", handleResize);
    document.addEventListener("sidebar:resize:active", handleResizeActive);
    document.addEventListener("sidebar:resize:toggle", handleToggle);

    // Also listen for CSS custom property changes
    const observer = new MutationObserver(updateWidth);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      document.removeEventListener("sidebar:resize", handleResize);
      document.removeEventListener("sidebar:resize:active", handleResizeActive);
      document.removeEventListener("sidebar:resize:toggle", handleToggle);
      observer.disconnect();
    };
  }, []);

  return { sidebarWidth, isSidebarOpen };
};

export default function SidebarMenu(props: any) {
  const { document, state = document.state.global, dispatch } = props;
  const { roadmaps, milestones, deliverables } = state;

  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(
    undefined
  );

  const { sidebarWidth, isSidebarOpen } = useSidebarWidth();

  console.log("activeNodeId", activeNodeId);
  console.log("roadmaps", roadmaps);

  // Use useMemo to recalculate nodes whenever the state changes
  const nodes: SidebarNode[] = useMemo(
    () => [
      {
        id: "roadmaps",
        title: "Roadmaps",
        children: roadmaps.map((roadmap: any) => ({
          id: `roadmap.${roadmap.id}`,
          title: roadmap.title,
          children: roadmap.milestones.map((milestone: any) => ({
            id: `milestone.${milestone.id}`,
            title: milestone.title,
            children: [],
          })),
        })),
      },
      {
        id: "projects",
        title: "Projects",
        children: [],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        children: deliverables.map((deliverable: any) => ({
          id: `deliverable.${deliverable.id}`,
          title: deliverable.title,
          children: [],
        })),
      },
    ],
    [roadmaps, deliverables, state]
  ); // Dependencies that should trigger recalculation

  // Component that updates sidebar nodes when state changes
  const SidebarUpdater = ({ nodes }: { nodes: SidebarNode[] }) => {
    const { setNodes } = useSidebar();

    useEffect(() => {
      setNodes(nodes);
    }, [nodes, setNodes]);

    return null;
  };

  const displayActiveNode = (activeNodeId: string) => {
    const id = activeNodeId.split(".")[1];
    const name = activeNodeId.split(".")[0];

    console.log("id", id);
    console.log("name", name);

    switch (name) {
      case "roadmap":
        return (
          <Roadmaps
            dispatch={dispatch}
            roadmaps={roadmaps.filter((r: any) => r.id === id)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen">
      <SidebarProvider nodes={nodes}>
        <SidebarUpdater nodes={nodes} />
        <Sidebar
          // nodes={nodes}
          sidebarTitle="Scope of Work"
          sidebarIcon={<Icon name="BrickGlobe" />}
          enableMacros={3}
          allowPinning={true}
          resizable={true}
          activeNodeId={activeNodeId}
          onActiveNodeChange={(node) => {
            setActiveNodeId(node.id);
          }}
        />
      </SidebarProvider>

      {/* Main content area that adjusts based on sidebar width */}
      <div
        className="flex-1 transition-all duration-75 ease-linear bg-white"
        style={{
          marginLeft: isSidebarOpen ? `0` : "8px",
          width: isSidebarOpen
            ? `calc(100vw - ${sidebarWidth}px)`
            : "calc(100vw - 8px)",
        }}
      >
        <button
          onClick={() => {
            setActiveNodeId(undefined);
          }}
        >
          reset
        </button>
        {activeNodeId ? (
          displayActiveNode(activeNodeId)
        ) : (
          <ScopeOfWork {...props} />
        )}
      </div>
    </div>
  );
}
