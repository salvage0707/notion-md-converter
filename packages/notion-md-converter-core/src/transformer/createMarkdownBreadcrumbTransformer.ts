import { createBasicBreadcrumbTransformer } from "./createBasicTransformer";

export const createMarkdownBreadcrumbTransformer = () => {
  return createBasicBreadcrumbTransformer(() => {
    return "";
  });
};
