import { createChildPageTransformerFactory } from "./transformerFactory";

export const createMarkdownChildPageTransformer = () => {
  return createChildPageTransformerFactory(() => {
    return "";
  });
};
