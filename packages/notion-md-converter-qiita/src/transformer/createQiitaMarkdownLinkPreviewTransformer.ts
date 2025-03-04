import { createBasicLinkPreviewTransformer, MarkdownUtils } from "@notion-md-converter/core";
import type { LinkPreviewTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownLinkPreviewTransformer = (): LinkPreviewTransformer => {
  return createBasicLinkPreviewTransformer(({ block }) => {
    const url = block.link_preview.url;
    const { result, isEmbed } = QiitaMarkdownUtils.embedByURL(url);
    if (isEmbed) {
      return result;
    }
    return MarkdownUtils.wrapWithNewLines(QiitaMarkdownUtils.linkCard(url));
  });
};
