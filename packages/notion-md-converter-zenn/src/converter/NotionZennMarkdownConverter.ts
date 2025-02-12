import { createMarkdownPdfTransformer, NotionMarkdownConverter } from "@notion-md-converter/core";
import {
  createMarkdownCalloutTransformer,
  createMarkdownFileTransformer,
  createMarkdownImageTransformer,
  createMarkdownLinkPreviewTransformer,
  createMarkdownToggleTransformer,
  createMarkdownVideoTransformer,
} from "@notion-md-converter/core";
import type { FileAdapter } from "@notion-md-converter/core/types";
import { createZennMarkdownCodeTransformer } from "src/transfomers";

type ConstructorOptions = {
  file?: {
    adapter: FileAdapter;
  };
  image?: {
    adapter: FileAdapter;
  };
  pdf?: {
    adapter: FileAdapter;
  };
  video?: {
    adapter: FileAdapter;
  };
};

export class NotionZennMarkdownConverter extends NotionMarkdownConverter {
  constructor(options: ConstructorOptions = {}) {
    super({
      code: createZennMarkdownCodeTransformer(),
      callout: createMarkdownCalloutTransformer(),
      link_preview: createMarkdownLinkPreviewTransformer(),
      toggle: createMarkdownToggleTransformer(),
      file: createMarkdownFileTransformer(),
      image: createMarkdownImageTransformer(),
      pdf: createMarkdownPdfTransformer(),
      video: createMarkdownVideoTransformer(),
    });
  }
}
