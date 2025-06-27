import type { EditorProps } from "document-model";
import {
  type ScopeOfWorkDocument,
  actions,
} from "../../document-models/scope-of-work/index.js";
import { Button } from "@powerhousedao/design-system";

export type IProps = EditorProps<ScopeOfWorkDocument>;

export default function Editor(props: IProps) {
  return (
    <div>
      <div className="html-defaults-container">
        <h1>This h1 will be styled</h1>
        <p>This paragraph will also be styled.</p>
        <Button size="small" className="bg-blue-500 text-white mt-4">Styled Button</Button>
      </div>
      <div>
        <h1>
          This h1 outside the container will NOT be styled by html-defaults.css
        </h1>
      </div>
    </div>
  );
}
