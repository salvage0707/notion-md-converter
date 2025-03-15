import { MarkdownUtils } from "../utils";
import { createTodoTransformerFactory } from "./transformerFactory";

export const createMarkdownTodoListItemTransformer = () => {
  return createTodoTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.to_do.rich_text);
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.checkList(text, block.to_do.checked);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
