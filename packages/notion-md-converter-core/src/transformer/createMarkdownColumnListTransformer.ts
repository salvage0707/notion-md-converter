import { createBasicColumnListTransformer } from "./createBasicTransformer";

export const createMarkdownColumnListTransformer = () => {
  return createBasicColumnListTransformer(({ columns }) => {
    return columns.join("\n");
  });
};
