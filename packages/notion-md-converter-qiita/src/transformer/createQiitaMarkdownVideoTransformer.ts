import {
  MarkdownUtils,
  createNoChangeFileObjectAdapter,
  createVideoTransformerFactory,
  ProviderUtils,
  isURL,
} from "@notion-md-converter/core";
import type { FileAdapter, VideoTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): VideoTransformer => {
  return createVideoTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);

    if (isURL(url)) {
      const provider = ProviderUtils.getType(url);
      if (provider === "youtube") {
        return QiitaMarkdownUtils.embedYoutube(url);
      }
    }

    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
