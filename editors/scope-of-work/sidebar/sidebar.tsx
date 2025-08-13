import {
  SidebarProvider,
  Sidebar,
  IconName,
  Icon,
  useSidebar,
} from "@powerhousedao/document-engineering";
import { ReactElement, useState, useEffect, useMemo } from "react";
import ScopeOfWork from "./scopeOfWork.js";
import Roadmap from "./roadmap.js";
import Milestone from "./milestone.js";
import Deliverable from "./deliverable.js";
import Projects from "./projects.js";
import Project from "./project.js";
import Deliverables from "./deliverables.js";
import Roadmaps from "./roadmaps.js";
import Contributors from "./contributors.js";

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
  const { roadmaps, deliverables, projects, contributors } = state;
  const milestones = state.roadmaps.flatMap((r: any) => r.milestones);
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(
    undefined
  );

  const { sidebarWidth, isSidebarOpen } = useSidebarWidth();

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
            title: milestone.sequenceCode
              ? `${milestone.sequenceCode} - ${milestone.title}`
              : milestone.title,
            children: [],
          })),
        })),
      },
      {
        id: "projects",
        title: "Projects",
        children: projects.map((project: any) => ({
          id: `project.${project.id}`,
          title: project.code
            ? `${project.code} - ${project.title}`
            : project.title,
          children: [],
        })),
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
      {
        id: "contributors",
        title: "Contributors",
        children: [],
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

    switch (name) {
      case "roadmaps":
        return (
          <Roadmaps
            dispatch={dispatch}
            roadmaps={roadmaps}
            setActiveNodeId={setActiveNodeId}
          />
        );
      case "roadmap":
        return (
          <Roadmap
            dispatch={dispatch}
            roadmaps={roadmaps.filter((r: any) => r.id === id)}
            setActiveNodeId={setActiveNodeId}
          />
        );
      case "milestone":
        return (
          <Milestone
            dispatch={dispatch}
            milestones={milestones.filter((m: any) => m.id === id)}
            roadmaps={roadmaps}
            deliverables={deliverables}
            setActiveNodeId={setActiveNodeId}
          />
        );
      case "deliverables":
        return (
          <Deliverables
            dispatch={dispatch}
            deliverables={deliverables}
            milestones={milestones}
            projects={projects}
            setActiveNodeId={setActiveNodeId}
            document={document}
          />
        );
      case "deliverable":
        return (
          <Deliverable
            dispatch={dispatch}
            deliverables={deliverables.filter((d: any) => d.id === id)}
            projects={projects}
            contributors={contributors}
          />
        );
      case "projects":
        return (
          <Projects
            dispatch={dispatch}
            projects={projects}
            setActiveNodeId={setActiveNodeId}
            contributors={contributors}
          />
        );
      case "project":
        return (
          <Project
            dispatch={dispatch}
            project={projects.find((p: any) => p.id === id)}
            deliverables={deliverables}
            setActiveNodeId={setActiveNodeId}
            contributors={contributors}
          />
        );
      case "contributors":
        return (
          <Contributors
            dispatch={dispatch}
            contributors={contributors}
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
          sidebarIcon={<Icon name="Globe" />}
          enableMacros={3}
          allowPinning={true}
          resizable={true}
          activeNodeId={activeNodeId}
          onActiveNodeChange={(node) => {
            setActiveNodeId(node.id);
          }}
          handleOnTitleClick={() => {
            setActiveNodeId(undefined);
          }}
        />
      </SidebarProvider>

      {/* Main content area that adjusts based on sidebar width */}
      <div
        className="flex-1 transition-all duration-75 ease-linear"
        style={{
          marginLeft: isSidebarOpen ? `0` : "8px",
          width: isSidebarOpen
            ? `calc(100vw - ${sidebarWidth}px)`
            : "calc(100vw - 8px)",
        }}
      >
        {activeNodeId ? (
          displayActiveNode(activeNodeId)
        ) : (
          <ScopeOfWork {...props} setActiveNodeId={setActiveNodeId} />
        )}
      </div>
    </div>
  );
}
