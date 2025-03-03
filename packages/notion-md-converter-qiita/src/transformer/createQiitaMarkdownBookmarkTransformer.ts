import { createBasicBookmarkTransformer, MarkdownUtils } from "@notion-md-converter/core";
import type { BookmarkTransformer } from "@notion-md-converter/core/types";

export const createQiitaMarkdownBookmarkTransformer = (): BookmarkTransformer => {
  return createBasicBookmarkTransformer(({ block }) => {
    return MarkdownUtils.wrapWithNewLines(block.bookmark.url);
  });
};
