import { createBasicLinkPreviewTransformer } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownLinkPreviewTransformer = () => {
  return createBasicLinkPreviewTransformer(({ block }) => {
    const url = block.link_preview.url;
    const { result } = ZennMarkdownUtils.embedByURL(url);
    return result;
  });
};
