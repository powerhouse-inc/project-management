import { BaseDocumentClass } from "document-model";
import { ScopeOfWorkPHState } from "../ph-factories.js";
import {
  type AddRoadmapInput,
  type RemoveRoadmapInput,
  type EditRoadmapInput,
} from "../types.js";
import { addRoadmap, removeRoadmap, editRoadmap } from "./creators.js";
import { type ScopeOfWorkAction } from "../actions.js";

export default class ScopeOfWork_Roadmaps extends BaseDocumentClass<ScopeOfWorkPHState> {
  public addRoadmap(input: AddRoadmapInput) {
    return this.dispatch(addRoadmap(input));
  }

  public removeRoadmap(input: RemoveRoadmapInput) {
    return this.dispatch(removeRoadmap(input));
  }

  public editRoadmap(input: EditRoadmapInput) {
    return this.dispatch(editRoadmap(input));
  }
}
