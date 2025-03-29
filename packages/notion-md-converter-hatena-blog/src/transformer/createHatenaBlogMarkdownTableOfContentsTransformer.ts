import { MarkdownUtils, createTableOfContentsTransformerFactory } from "@notion-md-converter/core";

export const createHatenaBlogMarkdownTableOfContentsTransformer = () => {
  return createTableOfContentsTransformerFactory(() => {
    return MarkdownUtils.wrapWithNewLines("[:contents]");
  });
};
