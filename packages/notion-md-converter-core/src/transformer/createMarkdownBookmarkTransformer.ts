import { MarkdownUtils } from "../utils";
import { createBookmarkTransformerFactory } from "./transformerFactory";

export const createMarkdownBookmarkTransformer = () => {
  return createBookmarkTransformerFactory(({ block }) => {
    const caption = MarkdownUtils.richTextsToMarkdown(block.bookmark.caption);
    return MarkdownUtils.link(caption || block.bookmark.url, block.bookmark.url);
  });
};
