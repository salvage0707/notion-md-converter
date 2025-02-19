import plainText from "./plain-text.json" assert { type: "json" };
import richText from "./rich-text.json" assert { type: "json" };
import captionFilename from "./caption-filename.json" assert { type: "json" };
import captionRichText from "./caption-rich-text.json" assert { type: "json" };
import javascript from "./javascript.json" assert { type: "json" };
import mermaid from "./mermaid.json" assert { type: "json" };
import captionDiffAndFilename from "./caption-diff-and-filename.json" assert { type: "json" };
import captionDiff from "./caption-diff.json" assert { type: "json" };

const codeFixture = {
  plainText,
  richText,
  captionFilename,
  captionRichText,
  javascript,
  mermaid,
  captionDiffAndFilename,
  captionDiff,
};

export {
  codeFixture,
}; 