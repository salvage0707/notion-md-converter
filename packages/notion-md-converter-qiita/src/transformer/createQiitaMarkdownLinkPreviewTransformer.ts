import { MarkdownUtils, createLinkPreviewTransformerFactory } from "@notion-md-converter/core";
import type { LinkPreviewTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownLinkPreviewTransformer = (): LinkPreviewTransformer => {
  return createLinkPreviewTransformerFactory(({ block }) => {
    const url = block.link_preview.url;
    const { result, isEmbed } = QiitaMarkdownUtils.embedByURL(url);
    if (isEmbed) {
      return result;
    }
    return MarkdownUtils.wrapWithNewLines(QiitaMarkdownUtils.linkCard(url));
  });
};
