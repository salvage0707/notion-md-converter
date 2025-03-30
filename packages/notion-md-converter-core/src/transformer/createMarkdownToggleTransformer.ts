import { MarkdownUtils } from "../utils";
import { createToggleTransformerFactory } from "./transformerFactory";

export const createMarkdownToggleTransformer = () => {
  return createToggleTransformerFactory(({ block, children, context }) => {
    const title = context.tools.richTextFormatter.format(block.toggle.rich_text);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.details(title, children));
  });
};
