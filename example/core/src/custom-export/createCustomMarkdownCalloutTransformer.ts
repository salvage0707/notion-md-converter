import { MarkdownUtils, createBasicCalloutTransformer } from "@notion-md-converter/core";

export const createCustomMarkdownCalloutTransformer = () => {
  // This is a helper function to create a Transformer for Notion Blocks.
  // Each Notion Block type has its own helper function available.
  // Using these helpers simplifies the implementation of Markdown conversion logic.
  return createBasicCalloutTransformer(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.callout.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    // Customize the callout to be a code block
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.codeBlock(result));
  });
};
