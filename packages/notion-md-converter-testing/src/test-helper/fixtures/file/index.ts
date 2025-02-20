import bgColor from "./bg-color.json" assert { type: "json" };
import captionRichText from "./caption-rich-text.json" assert { type: "json" };
import caption from "./caption.json" assert { type: "json" };
import empty from "./empty.json" assert { type: "json" };
import external from "./external.json" assert { type: "json" };
import pdf from "./pdf.json" assert { type: "json" };
import textColor from "./text-color.json" assert { type: "json" };
import upload from "./upload.json" assert { type: "json" };

const fileFixture = {
  pdf,
  textColor,
  upload,
  captionRichText,
  caption,
  empty,
  external,
  bgColor,
};

export { fileFixture };
