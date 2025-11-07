import { DocumentToolbar } from "@powerhousedao/design-system";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
} from "@powerhousedao/reactor-browser";
import { useSelectedScopeOfWorkDocument } from "../hooks/useScopeOfWorkDocument.js";
import SidebarMenu from "./sidebar/sidebar.js";

export function Editor() {
  const [document] = useSelectedScopeOfWorkDocument();

  // Get the parent folder node for the currently selected node
  const parentFolder = useParentFolderForSelectedNode();

  // Set the selected node to the parent folder node (close the editor)
  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  return (
    <div>
      <DocumentToolbar document={document} onClose={handleClose} />
      <SidebarMenu />
    </div>
  );
}
