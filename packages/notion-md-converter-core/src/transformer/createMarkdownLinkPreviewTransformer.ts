import { MarkdownUtils } from "../utils";
import { createLinkPreviewTransformerFactory } from "./transformerFactory";

export const createMarkdownLinkPreviewTransformer = () => {
  return createLinkPreviewTransformerFactory(({ block }) => {
    const url = block.link_preview.url;
    return MarkdownUtils.link(url, url);
  });
};
