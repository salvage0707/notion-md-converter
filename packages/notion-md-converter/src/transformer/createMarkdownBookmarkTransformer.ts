import { MarkdownUtils } from "../utils";
import { createBasicBookmarkTransformer } from "./createBasicTransformer";

export const createMarkdownBookmarkTransformer = () => {
  return createBasicBookmarkTransformer(({ block }) => {
    const caption = MarkdownUtils.richTextsToMarkdown(block.bookmark.caption);
    return MarkdownUtils.link(
      caption || block.bookmark.url,
      block.bookmark.url
    );
  });
};
