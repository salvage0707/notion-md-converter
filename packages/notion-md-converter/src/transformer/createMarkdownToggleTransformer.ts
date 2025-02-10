import { MarkdownUtils } from "../utils";
import { createBasicToggleTransformer } from "./createBasicTransformer";

export const createMarkdownToggleTransformer = () => {
  return createBasicToggleTransformer(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(block.toggle.rich_text);
    return MarkdownUtils.wrapWithNewLines(
      MarkdownUtils.details(title, children)
    );
  });
};
