import { MarkdownUtils } from "../utils";
import { createBulletedListItemTransformerFactory } from "./transformerFactory";

export const createMarkdownBulletedListItemTransformer = () => {
  return createBulletedListItemTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.bulleted_list_item.rich_text);
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.bulletList(text);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
