import type { Block } from "@notion-md-converter/types";
import noContent from "./no-content.json" assert { type: "json" };
import noTitle from "./no-title.json" assert { type: "json" };
import otherBlockInContent from "./other-block-in-content.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };

const toggleFixture = {
  "no-content": noContent as Block[],
  "no-title": noTitle as Block[],
  "other-block-in-content": otherBlockInContent as Block[],
  simple: simple as Block[],
};

export { toggleFixture };
