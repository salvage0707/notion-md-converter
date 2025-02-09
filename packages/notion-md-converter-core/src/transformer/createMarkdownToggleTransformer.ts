import { MarkdownUtils } from "../utils";
import { createBasicToggleTransformer } from "./createBasicTransformer";

export const createMarkdownToggleTransformer = () => {
  return createBasicToggleTransformer(({ block, children }) => {
    const title = MarkdownUtils.convertRichTextsToMarkdown(block.toggle.rich_text);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.convertToDetails(title, children));
  });
};
