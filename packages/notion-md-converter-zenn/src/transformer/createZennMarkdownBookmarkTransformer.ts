import { createBasicBookmarkTransformer } from "@notion-md-converter/core";
import type { BookmarkTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownBookmarkTransformer = (): BookmarkTransformer => {
  return createBasicBookmarkTransformer(({ block }) => {
    return block.bookmark.url;
  });
};
