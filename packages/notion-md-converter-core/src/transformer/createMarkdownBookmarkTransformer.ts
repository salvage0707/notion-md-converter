import { MarkdownUtils } from "../utils";
import { createBookmarkTransformerFactory } from "./transformerFactory";

export const createMarkdownBookmarkTransformer = () => {
  return createBookmarkTransformerFactory(({ block, context }) => {
    const caption = context.tools.richTextFormatter.format(block.bookmark.caption);
    return MarkdownUtils.link(caption || block.bookmark.url, block.bookmark.url);
  });
};
