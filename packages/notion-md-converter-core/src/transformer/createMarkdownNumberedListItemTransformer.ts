import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createNumberedListItemTransformerFactory } from "./transformerFactory";

type NumberedListItemTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownNumberedListItemTransformer = (
  options: NumberedListItemTransformerOptions = {},
) => {
  const { enableAnnotations, colorMap } = options;
  return createNumberedListItemTransformerFactory(({ block, children, index }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.numbered_list_item.rich_text,
      enableAnnotations,
      colorMap,
    );
    const formattedChildren = MarkdownUtils.indent(children, 3);
    const bulletText = MarkdownUtils.numberedList(text, index);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
