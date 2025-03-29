import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createBookmarkTransformerFactory } from "./transformerFactory";

type BookmarkTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownBookmarkTransformer = (options: BookmarkTransformerOptions = {}) => {
  return createBookmarkTransformerFactory(({ block }) => {
    const caption = MarkdownUtils.richTextsToMarkdown(
      block.bookmark.caption,
      options.enableAnnotations,
      options.colorMap,
    );
    return MarkdownUtils.link(caption || block.bookmark.url, block.bookmark.url);
  });
};
