import { dedent } from "./dedent";

describe("dedent", () => {
  describe("基本的な機能", () => {
    it("インデントを正しく削除する", () => {
      const result = dedent`
        const a = 1;
        const b = 2;
          const c = 3;
      `;
      expect(result).toBe("const a = 1;\nconst b = 2;\n  const c = 3;");
    });

    it("空行を保持する", () => {
      const result = dedent`
        const a = 1;

        const b = 2;
      `;
      expect(result).toBe("const a = 1;\n\nconst b = 2;");
    });

    it("変数展開を正しく処理する", () => {
      const value = "test";
      const num = 42;
      const result = dedent`
        const str = "${value}";
        const number = ${num};
      `;
      expect(result).toBe('const str = "test";\nconst number = 42;');
    });
  });

  describe("wrapオプション", () => {
    it("wrapオプションがtrueの場合、前後に改行を追加する", () => {
      const result = dedent({ wrap: true })`
        const a = 1;
        const b = 2;
      `;
      expect(result).toBe("\nconst a = 1;\nconst b = 2;\n");
    });

    it("wrapオプションがない場合、前後に改行を追加しない", () => {
      const result = dedent`
        const a = 1;
        const b = 2;
      `;
      expect(result).toBe("const a = 1;\nconst b = 2;");
    });
  });

  describe("エッジケース", () => {
    it("インデントが無い場合も正しく処理する", () => {
      const result = dedent`
const a = 1;
const b = 2;
      `;
      expect(result).toBe("const a = 1;\nconst b = 2;");
    });

    it("タブとスペースが混在する場合も正しく処理する", () => {
      const result = dedent`
        const a = 1;
      \tconst b = 2;
          const c = 3;
      `;
      expect(result).toBe("const a = 1;\nconst b = 2;\n  const c = 3;");
    });

    it("空文字列を正しく処理する", () => {
      const result = dedent``;
      expect(result).toBe("");
    });

    it("単一行を正しく処理する", () => {
      const result = dedent`    const a = 1;`;
      expect(result).toBe("const a = 1;");
    });
  });
});
