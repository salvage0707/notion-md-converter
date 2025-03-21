import { createTodoTransformerFactory, MarkdownUtils } from "@notion-md-converter/core";

type HatenaBlogTodoListItemTransformerOptions = {
  strikeThroughLine?: boolean;
};

export const createHatenaBlogMarkdownTodoListItemTransformer = (options: HatenaBlogTodoListItemTransformerOptions = {}) => {
  const { strikeThroughLine = true } = options;

  return createTodoTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.to_do.rich_text);
    const formattedChildren = MarkdownUtils.indent(children);
    let bulletText = "";
    if (strikeThroughLine) {
      bulletText = MarkdownUtils.bulletList(block.to_do.checked ? MarkdownUtils.strikethrough(text) : text);
    } else {
      bulletText = MarkdownUtils.bulletList(text);
    }

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
