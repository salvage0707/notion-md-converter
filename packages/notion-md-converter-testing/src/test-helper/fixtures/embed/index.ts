import type { Block } from "@notion-md-converter/types";
import xTwitter from "./x-twitter.json" assert { type: "json" };
import speackerDeck from "./speacker-deck.json" assert { type: "json" };

const embedFixture = {
  "x-twitter": xTwitter as Block[],
  "speacker-deck": speackerDeck as Block[],
};

export { embedFixture };
