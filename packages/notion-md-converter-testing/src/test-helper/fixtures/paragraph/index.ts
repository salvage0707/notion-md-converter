import richText from "./rich-text.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };
import userMention from "./user-mention.json" assert { type: "json" };
import multipleRichText from "./multiple-rich-text.json" assert { type: "json" };
import pageMention from "./page-mention.json" assert { type: "json" };
import rangeDateMention from "./range-date-mention.json" assert { type: "json" };
import remindMention from "./remind-mention.json" assert { type: "json" };
import dateMention from "./date-mention.json" assert { type: "json" };
import linkMention from "./link-mention.json" assert { type: "json" };

const paragraphFixture = {
  richText,
  simple,
  userMention,
  multipleRichText,
  pageMention,
  rangeDateMention,
  remindMention,
  dateMention,
  linkMention,
};

export {
  paragraphFixture,
}; 