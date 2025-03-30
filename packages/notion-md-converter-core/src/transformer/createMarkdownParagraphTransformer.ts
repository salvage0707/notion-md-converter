import { createParagraphTransformerFactory } from "./transformerFactory";

type ParagraphTransformerOptions = {
  br?: boolean;
};

export const createMarkdownParagraphTransformer = (options: ParagraphTransformerOptions = {}) => {
  const { br = false } = options;

  return createParagraphTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.paragraph.rich_text);
    const convertedMarkdown = children !== "" ? `${text}\n${children}` : text;
    return br ? `${convertedMarkdown}<br />` : convertedMarkdown;
  });
};
