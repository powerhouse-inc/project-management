import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { useSelectedScopeOfWorkDocument } from "document-models/scope-of-work";
import { Shell } from "./components/Shell.js";

/** Scope of Work editor: outline rail · document canvas · deliverable inspector. */
export default function Editor() {
  const [document, dispatch] = useSelectedScopeOfWorkDocument();
  return (
    <div>
      <DocumentToolbar />
      <Shell document={document} dispatch={dispatch} />
    </div>
  );
}
