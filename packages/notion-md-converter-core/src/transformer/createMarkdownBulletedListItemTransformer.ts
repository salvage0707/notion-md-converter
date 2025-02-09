import { MarkdownUtils } from "../utils";
import { createBasicBulletedListItemTransformer } from "./createBasicTransformer";

export const createMarkdownBulletedListItemTransformer = () => {
  return createBasicBulletedListItemTransformer(({ block, children }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(
      block.bulleted_list_item.rich_text
    );
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.convertToBulletList(text);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
