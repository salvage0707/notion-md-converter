import { createBasicChildDatabaseTransformer } from "./createBasicTransformer";

export const createMarkdownChildDatabaseTransformer = () => {
  return createBasicChildDatabaseTransformer(() => {
    return "";
  });
};
