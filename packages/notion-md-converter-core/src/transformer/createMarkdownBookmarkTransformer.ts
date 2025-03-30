import { MarkdownUtils } from "../utils";
import { createBookmarkTransformerFactory } from "./transformerFactory";

export const createMarkdownBookmarkTransformer = () => {
  return createBookmarkTransformerFactory(({ block, captionMetadata, context }) => {
    const richText = captionMetadata.getText();
    const caption = context.tools.richTextFormatter.format(richText);
    return MarkdownUtils.link(caption || block.bookmark.url, block.bookmark.url);
  });
};
