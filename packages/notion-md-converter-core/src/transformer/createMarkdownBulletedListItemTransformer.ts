import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createBulletedListItemTransformerFactory } from "./transformerFactory";

type BulletedListItemTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownBulletedListItemTransformer = (
  options: BulletedListItemTransformerOptions = {},
) => {
  return createBulletedListItemTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.bulleted_list_item.rich_text,
      options.enableAnnotations,
      options.colorMap,
    );
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.bulletList(text);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
