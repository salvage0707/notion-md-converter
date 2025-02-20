import type { Block } from "@notion-md-converter/types";
import threeLevels from "./three-levels.json" assert { type: "json" };
import nestAndOtherBlock from "./nest-and-other-block.json" assert { type: "json" };
import oneLevel from "./one-level.json" assert { type: "json" };

const numberedListItemFixture = {
  "three-levels": threeLevels as Block[],
  "nest-and-other-block": nestAndOtherBlock as Block[],
  "one-level": oneLevel as Block[],
};

export { numberedListItemFixture };
