import { createBasicChildPageTransformer } from "./createBasicTransformer";

export const createMarkdownChildPageTransformer = () => {
  return createBasicChildPageTransformer(() => {
    return "";
  });
};
