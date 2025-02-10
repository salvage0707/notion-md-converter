import { MarkdownUtils } from "../utils";
import { createBasicLinkPreviewTransformer } from "./createBasicTransformer";

export const createMarkdownLinkPreviewTransformer = () => {
  return createBasicLinkPreviewTransformer(({ block }) => {
    const url = block.link_preview.url;
    return MarkdownUtils.convertToLink(url, url);
  });
};
