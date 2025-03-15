import { createSyncedBlockTransformerFactory } from "./transformerFactory";

export const createMarkdownSyncedBlockTransformer = () => {
  return createSyncedBlockTransformerFactory(({ children }) => {
    return children;
  });
};
