import { createBasicSyncedBlockTransformer } from "./createBasicTransformer";

export const createMarkdownSyncedBlockTransformer = () => {
  return createBasicSyncedBlockTransformer(({ children }) => {
    return children;
  });
};
