import { MarkdownUtils } from "../utils";
import { createBasicTodoTransformer } from "./createBasicTransformer";

export const createMarkdownTodoListItemTransformer = () => {
  return createBasicTodoTransformer(({ block, children }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(
      block.to_do.rich_text
    );
    const formattedChildren = MarkdownUtils.indent(children);
    const bulletText = MarkdownUtils.checkList(text, block.to_do.checked);

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
