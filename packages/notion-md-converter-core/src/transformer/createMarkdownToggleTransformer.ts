import { MarkdownUtils } from "../utils";
import { createToggleTransformerFactory } from "./transformerFactory";

export const createMarkdownToggleTransformer = () => {
  return createToggleTransformerFactory(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(block.toggle.rich_text);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.details(title, children));
  });
};
