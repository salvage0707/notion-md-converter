import type { Block } from "@notion-md-converter/types";
import richText from "./rich-text.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };
import userMention from "./user-mention.json" assert { type: "json" };
import dateMention from "./date-mention.json" assert { type: "json" };
import linkMention from "./link-mention.json" assert { type: "json" };
import multipleRichText from "./multiple-rich-text.json" assert { type: "json" };
import pageMention from "./page-mention.json" assert { type: "json" };
import rangeDateMention from "./range-date-mention.json" assert { type: "json" };
import remindMention from "./remind-mention.json" assert { type: "json" };

const paragraphFixture = {
  "rich-text": richText as Block[],
  "simple": simple as Block[],
  "user-mention": userMention as Block[],
  "date-mention": dateMention as Block[],
  "link-mention": linkMention as Block[],
  "multiple-rich-text": multipleRichText as Block[],
  "page-mention": pageMention as Block[],
  "range-date-mention": rangeDateMention as Block[],
  "remind-mention": remindMention as Block[],
};

export { paragraphFixture };
