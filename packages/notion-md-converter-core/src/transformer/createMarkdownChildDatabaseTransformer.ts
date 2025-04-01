import { createChildDatabaseTransformerFactory } from "./transformerFactory";

export const createMarkdownChildDatabaseTransformer = () => {
  return createChildDatabaseTransformerFactory(() => {
    return null;
  });
};
