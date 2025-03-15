import { createBreadcrumbTransformerFactory } from "./transformerFactory";

export const createMarkdownBreadcrumbTransformer = () => {
  return createBreadcrumbTransformerFactory(() => {
    return "";
  });
};
