import type { Block } from "@notion-md-converter/types";
import threeColumns from "./3-columns.json" assert { type: "json" };
import otherBlockInColumns from "./other-block-in-columns.json" assert { type: "json" };

const columnListFixture = {
  "other-block-in-columns": otherBlockInColumns as Block[],
  "3-columns": threeColumns as Block[],
};

export { columnListFixture };
