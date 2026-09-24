import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import coreValue from "../packages/core/index.mjs";

const rootManifest = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const workspaceManifest = await readFile(
  new URL("../pnpm-workspace.yaml", import.meta.url),
  "utf8",
);
const coreManifest = JSON.parse(
  await readFile(new URL("../packages/core/package.json", import.meta.url), "utf8"),
);

assert.equal(rootManifest.private, true);
assert.equal(rootManifest.packageManager, "pnpm@10.17.1");
assert.deepEqual(rootManifest.scripts, {
  check: "node scripts/check.mjs",
  test: "node --test test/workspace.test.mjs",
});
assert.equal("dependencies" in rootManifest, false);
assert.equal("devDependencies" in rootManifest, false);
assert.equal(workspaceManifest, "packages:\n  - packages/*\n");
assert.equal(coreManifest.private, true);
assert.equal(coreManifest.type, "module");
assert.equal("dependencies" in coreManifest, false);
assert.equal("devDependencies" in coreManifest, false);
assert.equal(coreValue, "greenfield-pnpm-v0110");
