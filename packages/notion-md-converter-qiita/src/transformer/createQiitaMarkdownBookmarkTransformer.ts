import { MarkdownUtils, createBookmarkTransformerFactory } from "@notion-md-converter/core";
import type { BookmarkTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownBookmarkTransformer = (): BookmarkTransformer => {
  return createBookmarkTransformerFactory(({ block }) => {
    const { result, isEmbed } = QiitaMarkdownUtils.embedByURL(block.bookmark.url);
    if (isEmbed) {
      return MarkdownUtils.wrapWithNewLines(result);
    }
    return MarkdownUtils.wrapWithNewLines(QiitaMarkdownUtils.linkCard(block.bookmark.url));
  });
};
