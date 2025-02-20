import type { Block } from "@notion-md-converter/types";
import simple from "./simple.json" assert { type: "json" };

const dividerFixture = {
  "simple": simple as Block[],
};

export { dividerFixture };
