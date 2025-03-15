import { createColumnListTransformerFactory } from "./transformerFactory";

export const createMarkdownColumnListTransformer = () => {
  return createColumnListTransformerFactory(({ columns }) => {
    return columns.join("\n");
  });
};
