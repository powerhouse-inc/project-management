import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { type ScopeOfWorkState, type ScopeOfWorkLocalState } from "./types.js";
import { type ScopeOfWorkAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import ScopeOfWork_ScopeOfWork from "./scope-of-work/object.js";
import ScopeOfWork_Deliverables from "./deliverables/object.js";
import ScopeOfWork_Roadmaps from "./roadmaps/object.js";
import ScopeOfWork_Milestones from "./milestones/object.js";
import ScopeOfWork_DeliverablesSet from "./deliverables-set/object.js";
import ScopeOfWork_Agents from "./agents/object.js";

export * from "./scope-of-work/object.js";
export * from "./deliverables/object.js";
export * from "./roadmaps/object.js";
export * from "./milestones/object.js";
export * from "./deliverables-set/object.js";
export * from "./agents/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface ScopeOfWork
  extends ScopeOfWork_ScopeOfWork,
    ScopeOfWork_Deliverables,
    ScopeOfWork_Roadmaps,
    ScopeOfWork_Milestones,
    ScopeOfWork_DeliverablesSet,
    ScopeOfWork_Agents {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class ScopeOfWork extends BaseDocumentClass<
  ScopeOfWorkState,
  ScopeOfWorkLocalState,
  ScopeOfWorkAction
> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<ScopeOfWorkState>,
        PartialState<ScopeOfWorkLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, ScopeOfWork.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(ScopeOfWork, [
  ScopeOfWork_ScopeOfWork,
  ScopeOfWork_Deliverables,
  ScopeOfWork_Roadmaps,
  ScopeOfWork_Milestones,
  ScopeOfWork_DeliverablesSet,
  ScopeOfWork_Agents,
]);

export { ScopeOfWork };
