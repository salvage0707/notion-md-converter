import {
  MarkdownUtils,
  createVideoTransformerFactory,
  createNoChangeFileObjectAdapter,
  isURL,
} from "@notion-md-converter/core";
import type { FileAdapter, VideoTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): VideoTransformer => {
  return createVideoTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);

    if (isURL(url)) {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      if (domain === "www.youtube.com") {
        return ZennMarkdownUtils.embedYoutube(url);
      }
    }

    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
