import { MarkdownUtils, createToggleTransformerFactory } from "@notion-md-converter/core";
import type { ToggleTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownToggleTransformer = (): ToggleTransformer => {
  return createToggleTransformerFactory(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(block.toggle.rich_text);
    const wrap = children.includes(":::");
    return MarkdownUtils.wrapWithNewLines(ZennMarkdownUtils.details(title, children));
  });
};
