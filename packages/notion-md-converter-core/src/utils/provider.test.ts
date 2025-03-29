import { dedent } from "@notion-md-converter/testing";
import { ProviderAsciinemaUtils, ProviderCodePenUtils, ProviderYoutubeUtils } from "./provider";

describe("ProviderYoutubeUtils", () => {
  describe("embed", () => {
    it("デフォルトのサイズでiframe要素になること", () => {
      const result = ProviderYoutubeUtils.embed("https://www.youtube.com/watch?v=123456789");
      expect(result).toBe(
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/123456789" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
      );
    });

    it("サイズを指定できること", () => {
      const result = ProviderYoutubeUtils.embed("https://www.youtube.com/watch?v=123456789", {
        width: "800",
        height: "600",
      });
      expect(result).toBe(
        '<iframe width="800" height="600" src="https://www.youtube.com/embed/123456789" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
      );
    });
  });
});

describe("ProviderCodePenUtils", () => {
  describe("embed", () => {
    it("embedCodePen記法になること", () => {
      const result = ProviderCodePenUtils.embed("https://codepen.io/tomoasleep/pen/dJgNLK/");
      expect(result).toBe(dedent`
      <p data-height="250" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
    });

    it("heightを指定できること", () => {
      const result = ProviderCodePenUtils.embed("https://codepen.io/tomoasleep/pen/dJgNLK/", {
        height: "300",
      });
      expect(result).toBe(dedent`
      <p data-height="300" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
    });

    it("defaultTabを指定できること", () => {
      const result = ProviderCodePenUtils.embed("https://codepen.io/tomoasleep/pen/dJgNLK/", {
        defaultTab: "js,result",
      });
      expect(result).toBe(dedent`
      <p data-height="250" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="js,result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen"></p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    `);
    });
  });
});

describe("ProviderAsciinemaUtils", () => {
  describe("embed", () => {
    it("jsファイルの場合、script要素になること", () => {
      const result = ProviderAsciinemaUtils.embed("https://asciinema.org/123456789.js");
      expect(result).toBe(
        '<script id="asciicast-123456789" src="https://asciinema.org/123456789.js" async></script>',
      );
    });

    it("jsファイル以外の場合、nullになること", () => {
      const result = ProviderAsciinemaUtils.embed("https://asciinema.org/123456789");
      expect(result).toBe(null);
    });
  });
});
