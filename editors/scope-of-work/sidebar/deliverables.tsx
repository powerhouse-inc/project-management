import { Deliverable } from "../../../document-models/scope-of-work/index.js";

interface DeliverablesProps {
  deliverables: Deliverable[];
  dispatch: any;
}

const Deliverables: React.FC<DeliverablesProps> = ({ deliverables, dispatch }) => {
  return (
    <div className="border border-gray-300 p-2">
      <div className="text-2xl font-semibold text-gray-700">Deliverables</div>
    </div>
  );
};

export default Deliverables;