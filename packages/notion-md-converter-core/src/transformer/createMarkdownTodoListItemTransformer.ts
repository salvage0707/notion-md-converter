import { MarkdownUtils } from "../utils";
import type { ColorMap, EnableAnnotations } from "../utils";
import { createTodoTransformerFactory } from "./transformerFactory";

type TodoListItemTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownTodoListItemTransformer = (
  options: TodoListItemTransformerOptions = {},
) => {
  const { enableAnnotations, colorMap } = options;
  return createTodoTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.to_do.rich_text,
      enableAnnotations,
      colorMap,
    );
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.checkList(text, block.to_do.checked);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
