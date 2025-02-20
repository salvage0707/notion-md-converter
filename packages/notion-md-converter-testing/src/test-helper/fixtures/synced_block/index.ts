import type { Block } from "@notion-md-converter/types";
import syncedFrom from "./synced-from.json" assert { type: "json" };
import syncedTo from "./synced-to.json" assert { type: "json" };

const syncedBlockFixture = {
  "synced-to": syncedTo as Block[],
  "synced-from": syncedFrom as Block[],
};

export { syncedBlockFixture };
