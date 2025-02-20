import type { Block } from "@notion-md-converter/types";
import textColor from "./text-color.json" assert { type: "json" };
import richText from "./rich-text.json" assert { type: "json" };
import bgColor from "./bg-color.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };
import noIcon from "./no-icon.json" assert { type: "json" };

const calloutFixture = {
  "text-color": textColor as Block[],
  "rich-text": richText as Block[],
  "bg-color": bgColor as Block[],
  "simple": simple as Block[],
  "no-icon": noIcon as Block[],
};

export { calloutFixture };
