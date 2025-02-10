import { MarkdownUtils } from "../utils";
import { createBasicBulletedListItemTransformer } from "./createBasicTransformer";

export const createMarkdownBulletedListItemTransformer = () => {
  return createBasicBulletedListItemTransformer(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.bulleted_list_item.rich_text
    );
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.bulletList(text);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
