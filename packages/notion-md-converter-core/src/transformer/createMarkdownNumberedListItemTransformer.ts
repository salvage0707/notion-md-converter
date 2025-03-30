import { MarkdownUtils } from "../utils";
import { createNumberedListItemTransformerFactory } from "./transformerFactory";

export const createMarkdownNumberedListItemTransformer = () => {
  return createNumberedListItemTransformerFactory(({ block, children, index, context }) => {
    const text = context.tools.richTextFormatter.format(block.numbered_list_item.rich_text);
    const formattedChildren = MarkdownUtils.indent(children, 3);
    const bulletText = MarkdownUtils.numberedList(text, index);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
