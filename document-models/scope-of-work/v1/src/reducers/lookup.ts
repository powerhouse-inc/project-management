import type {
  Milestone,
  Roadmap,
  ScopeOfWorkState,
} from "../../gen/schema/types.js";

/**
 * Locate a milestone by id across every roadmap, returning it together with
 * the roadmap that owns it. A single lookup means a single "not found" path:
 * once the roadmap is known to contain the milestone, the milestone exists.
 */
export function findMilestone(
  state: ScopeOfWorkState,
  milestoneId: string,
): { roadmap: Roadmap; milestone: Milestone } | undefined {
  for (const roadmap of state.roadmaps) {
    const milestone = roadmap.milestones.find(
      (candidate) => String(candidate.id) === String(milestoneId),
    );
    if (milestone) {
      return { roadmap, milestone };
    }
  }
  return undefined;
}
