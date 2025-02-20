import type { Block } from "@notion-md-converter/types";
import otherBlockInQuote from "./other-block-in-quote.json" assert { type: "json" };
import richText from "./rich-text.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };

const quoteFixture = {
  "other-block-in-quote": otherBlockInQuote as Block[],
  "rich-text": richText as Block[],
  "simple": simple as Block[],
};

export { quoteFixture };
