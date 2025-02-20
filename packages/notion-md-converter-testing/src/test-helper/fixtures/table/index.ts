import type { Block } from "@notion-md-converter/types";
import richText from "./rich-text.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };
import heading from "./heading.json" assert { type: "json" };
import onlyHeader from "./only-header.json" assert { type: "json" };

const tableFixture = {
  "rich-text": richText as Block[],
  "simple": simple as Block[],
  "heading": heading as Block[],
  "only-header": onlyHeader as Block[],
};

export { tableFixture };
