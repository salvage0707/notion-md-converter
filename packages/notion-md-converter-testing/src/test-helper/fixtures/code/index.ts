import type { Block } from "@notion-md-converter/types";
import richText from "./rich-text.json" assert { type: "json" };
import captionRichText from "./caption-rich-text.json" assert { type: "json" };
import plainText from "./plain-text.json" assert { type: "json" };
import captionDiff from "./caption-diff.json" assert { type: "json" };
import captionFilename from "./caption-filename.json" assert { type: "json" };
import javascript from "./javascript.json" assert { type: "json" };
import mermaid from "./mermaid.json" assert { type: "json" };
import captionDiffAndFilename from "./caption-diff-and-filename.json" assert { type: "json" };

const codeFixture = {
  "rich-text": richText as Block[],
  "caption-rich-text": captionRichText as Block[],
  "plain-text": plainText as Block[],
  "caption-diff": captionDiff as Block[],
  "caption-filename": captionFilename as Block[],
  "javascript": javascript as Block[],
  "mermaid": mermaid as Block[],
  "caption-diff-and-filename": captionDiffAndFilename as Block[],
};

export { codeFixture };
