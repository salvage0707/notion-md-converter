import { createBasicLinkPreviewTransformer } from "@notion-md-converter/core";
import type { LinkPreviewTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownLinkPreviewTransformer = (): LinkPreviewTransformer => {
  return createBasicLinkPreviewTransformer(({ block }) => {
    const url = block.link_preview.url;
    const { result } = ZennMarkdownUtils.embedByURL(url);
    return result;
  });
};
