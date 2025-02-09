import { createBasicTableOfContentsTransformer } from "./createBasicTransformer";

export const createMarkdownTableOfContentsTransformer = () => {
  return createBasicTableOfContentsTransformer(() => {
    return "";
  });
};
