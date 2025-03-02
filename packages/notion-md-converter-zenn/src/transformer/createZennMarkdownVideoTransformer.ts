import {
  MarkdownUtils,
  createBasicVideoTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, VideoTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownVideoTransformer = (
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
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      if (domain === "www.youtube.com") {
        return ZennMarkdownUtils.embedYoutube(url);
      }
    }

    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
