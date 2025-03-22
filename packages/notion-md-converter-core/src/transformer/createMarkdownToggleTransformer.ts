import { MarkdownUtils } from "../utils";
import type { ColorMap, EnableAnnotations } from "../utils";
import { createToggleTransformerFactory } from "./transformerFactory";
type ToggleTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownToggleTransformer = (options: ToggleTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;
  return createToggleTransformerFactory(({ block, children }) => {
    const title = MarkdownUtils.richTextsToMarkdown(
      block.toggle.rich_text,
      enableAnnotations,
      colorMap,
    );
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.details(title, children));
  });
};
