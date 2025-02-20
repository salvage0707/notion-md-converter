import type { Block } from "@notion-md-converter/types";
import simple from "./simple.json" assert { type: "json" };

const childPageFixture = {
  "simple": simple as Block[],
};

export { childPageFixture };
