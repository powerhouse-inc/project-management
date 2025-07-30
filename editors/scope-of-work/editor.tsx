import type { EditorProps } from "document-model";
import {
  type ScopeOfWorkDocument,
  actions,
} from "../../document-models/scope-of-work/index.js";
import Sidebar from "./sidebar/oldSidebar.js";
import SidebarMenu from "./sidebar/sidebar.js";

export type IProps = EditorProps<ScopeOfWorkDocument>;

export default function Editor(props: IProps) {

  return (
    <div className="html-defaults-container">
      <SidebarMenu {...props} />
      {/* <Sidebar {...props} /> */}
    </div>
  );
}
