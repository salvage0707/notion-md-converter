import { createBasicToggleTransformer, MarkdownUtils } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownToggleTransformer = () => {
  return createBasicToggleTransformer(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(block.toggle.rich_text);
    const wrap = children.includes(":::");
    return MarkdownUtils.wrapWithNewLines(ZennMarkdownUtils.details(title, children));
  });
};
