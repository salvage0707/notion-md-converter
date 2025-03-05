import {
  MarkdownUtils,
  createBasicVideoTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, VideoTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): VideoTransformer => {
  return createBasicVideoTransformer(({ block }) => {
    const checkURL = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);
    const isURL = checkURL(url);

    if (isURL) {
      const embedType = QiitaMarkdownUtils.getEmbedType(url);
      if (embedType === "youtube") {
        return QiitaMarkdownUtils.embedYoutube(url);
      }
    }

    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
