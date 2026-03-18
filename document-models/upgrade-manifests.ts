import type { UpgradeManifest } from "document-model";
import { scopeOfWorkUpgradeManifest } from "./scope-of-work/upgrades/upgrade-manifest.js";

export const upgradeManifests: UpgradeManifest<readonly number[]>[] = [
  scopeOfWorkUpgradeManifest,
];
