import { MarkdownUtils, createBasicToggleTransformer } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "../utils";
import type { ToggleTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownToggleTransformer = (): ToggleTransformer => {
  return createBasicToggleTransformer(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(block.toggle.rich_text);
    const wrap = children.includes(":::");
    return MarkdownUtils.wrapWithNewLines(ZennMarkdownUtils.details(title, children));
  });
};
