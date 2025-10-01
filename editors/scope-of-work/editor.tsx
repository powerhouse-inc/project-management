import type { EditorProps } from "document-model";
import SidebarMenu from "./sidebar/sidebar.js";

export type IProps = EditorProps;

export default function Editor(props: IProps) {
  return <SidebarMenu {...props} />;
}
