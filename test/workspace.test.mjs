import assert from "node:assert/strict";
import test from "node:test";

import coreValue from "../packages/core/index.mjs";

test("core exports the workspace value", () => {
  assert.equal(coreValue, "greenfield-pnpm-v0110");
});
