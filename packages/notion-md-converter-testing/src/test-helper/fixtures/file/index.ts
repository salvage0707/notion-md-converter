import type { Block } from "@notion-md-converter/types";
import bgColor from "./bg-color.json" assert { type: "json" };
import captionRichText from "./caption-rich-text.json" assert { type: "json" };
import caption from "./caption.json" assert { type: "json" };
import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import pdf from "./pdf.json" assert { type: "json" };
import textColor from "./text-color.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };

const fileFixture = {
  "pdf": pdf as Block[],
  "text-color": textColor as Block[],
  "upload": upload as Block[],
  "caption-rich-text": captionRichText as Block[],
  "caption": caption as Block[],
  "empty": empty as Block[],
  "external": external as Block[],
  "bg-color": bgColor as Block[],
};

export { fileFixture };
