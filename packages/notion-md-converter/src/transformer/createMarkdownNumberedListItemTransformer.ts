import { MarkdownUtils } from "../utils";
import { createBasicNumberedListItemTransformer } from "./createBasicTransformer";

export const createMarkdownNumberedListItemTransformer = () => {
  return createBasicNumberedListItemTransformer(({ block, children, index }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.numbered_list_item.rich_text);
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.numberedList(text, index);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
