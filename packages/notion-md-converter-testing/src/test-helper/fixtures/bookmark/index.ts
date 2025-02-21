import type { Block } from "@notion-md-converter/types";
import captionRichText from "./caption-rich-text.json" assert { type: "json" };
import caption from "./caption.json" assert { type: "json" };
import emptyUrl from "./empty-url.json" assert { type: "json" };
import simple from "./simple.json" assert { type: "json" };

const bookmarkFixture = {
  "caption-rich-text": captionRichText as Block[],
  caption: caption as Block[],
  "empty-url": emptyUrl as Block[],
  simple: simple as Block[],
};

export { bookmarkFixture };
