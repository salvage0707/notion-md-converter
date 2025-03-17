import { MarkdownUtils, createCalloutTransformerFactory } from "@notion-md-converter/core";
import type { ApiColor, CalloutTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownCalloutTransformer = (
  options: {
    alertColors?: ApiColor[];
  } = {
    alertColors: ["red", "red_background"],
  },
): CalloutTransformer => {
  return createCalloutTransformerFactory(({ block, children }) => {
    // リッチテキストをマークダウンに変換
    const text = MarkdownUtils.richTextsToMarkdown(block.callout.rich_text);
    const color = block.callout.color;

    // 子要素がある場合は追加
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }

    // カラーに基づいてCalloutのタイプを決定
    const isAlert = options.alertColors?.includes(color);
    const calloutType = isAlert ? "danger" : "info";
    
    // Calloutコンポーネント形式に変換
    const calloutOutput = `<Callout type="${calloutType}" title="">\n  ${result}\n</Callout>`;
    
    return MarkdownUtils.wrapWithNewLines(calloutOutput);
  });
};