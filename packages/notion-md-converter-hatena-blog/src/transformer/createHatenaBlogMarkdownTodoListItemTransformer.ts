import { MarkdownUtils, createTodoTransformerFactory } from "@notion-md-converter/core";

type HatenaBlogTodoListItemTransformerOptions = {
  strikeThroughLine?: boolean;
};

export const createHatenaBlogMarkdownTodoListItemTransformer = (
  options: HatenaBlogTodoListItemTransformerOptions = {},
) => {
  const { strikeThroughLine = true } = options;

  return createTodoTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.to_do.rich_text, {
      color: true,
    });
    const formattedChildren = MarkdownUtils.indent(children);
    let bulletText = "";
    if (strikeThroughLine) {
      bulletText = MarkdownUtils.bulletList(
        block.to_do.checked ? MarkdownUtils.strikethrough(text) : text,
      );
    } else {
      bulletText = MarkdownUtils.bulletList(text);
    }

    if (children === "") {
      return bulletText;
    }

    return `${bulletText}\n${formattedChildren}`;
  });
};
