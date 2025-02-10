import { MarkdownUtils } from "../utils";
import { createBasicDividerTransformer } from "./createBasicTransformer";

export const createMarkdownDividerTransformer = () => {
  return createBasicDividerTransformer(() =>
    MarkdownUtils.wrapWithNewLines(MarkdownUtils.convertToHorizontalRule()),
  );
};
