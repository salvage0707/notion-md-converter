import { MarkdownUtils, createCalloutTransformerFactory } from "@notion-md-converter/core";
import type { ApiColor, CalloutTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

const DEFAULT_WARN_COLORS: ApiColor[] = ["yellow", "yellow_background"];
const DEFAULT_ALERT_COLORS: ApiColor[] = ["red", "red_background"];

export const createQiitaMarkdownCalloutTransformer = (
  options: {
    warnColors?: ApiColor[];
    alertColors?: ApiColor[];
  } = {},
): CalloutTransformer => {
  return createCalloutTransformerFactory(({ block, children, context }) => {
    const warnColors = options.warnColors ?? DEFAULT_WARN_COLORS;
    const alertColors = options.alertColors ?? DEFAULT_ALERT_COLORS;

    const getColor = (color: ApiColor) => {
      if (warnColors.includes(color)) {
        return "warn";
      }
      if (alertColors.includes(color)) {
        return "alert";
      }
      return "info";
    };

    const text = context.tools.richTextFormatter.format(block.callout.rich_text);
    const color = getColor(block.callout.color);

    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }

    return MarkdownUtils.wrapWithNewLines(QiitaMarkdownUtils.note(result, color));
  });
};
