import type { UpgradeManifest } from "document-model";
import { latestVersion, supportedVersions } from "./versions.js";

export const scopeOfWorkUpgradeManifest: UpgradeManifest<
  typeof supportedVersions
> = {
  documentType: "powerhouse/scopeofwork",
  latestVersion,
  supportedVersions,
  upgrades: {},
};
