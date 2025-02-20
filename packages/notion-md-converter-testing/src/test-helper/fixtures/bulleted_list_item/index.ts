import type { Block } from "@notion-md-converter/types";
import nestAndOtherBlock from "./nest-and-other-block.json" assert { type: "json" };
import oneLevel from "./one-level.json" assert { type: "json" };
import threeLevels from "./three-levels.json" assert { type: "json" };

const bulletedListItemFixture = {
  "nest-and-other-block": nestAndOtherBlock as Block[],
  "one-level": oneLevel as Block[],
  "three-levels": threeLevels as Block[],
};

export { bulletedListItemFixture };
