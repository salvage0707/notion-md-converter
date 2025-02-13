import { MarkdownUtils, createBasicCalloutTransformer } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "../utils";
import type { Emoji } from "@notion-md-converter/core/types";

export const createZennMarkdownCalloutTransformer = (
  options: {
    alertEmojis?: Emoji[];
  } = {
    alertEmojis: ["🚨"],
  },
) => {
  return createBasicCalloutTransformer(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.callout.rich_text);
    const icon = block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "";

    let result = text;
    let wrap = false;
    if (children !== "") {
      result += `\n${children}`;
      wrap = children.includes(":::");
    }

    const isAlert = options.alertEmojis?.includes(icon as Emoji);
    return MarkdownUtils.wrapWithNewLines(ZennMarkdownUtils.message(result, isAlert, wrap));
  });
};
