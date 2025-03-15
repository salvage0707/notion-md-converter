import { createTableOfContentsTransformerFactory } from "./transformerFactory";

export const createMarkdownTableOfContentsTransformer = () => {
  return createTableOfContentsTransformerFactory(() => {
    return "";
  });
};
