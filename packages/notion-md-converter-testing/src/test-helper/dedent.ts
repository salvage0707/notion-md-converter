/**
 * テンプレートリテラル内のインデントを調整するための関数
 * 
 * @description
 * この関数は、テンプレートリテラル内のテキストのインデントを整形します。
 * 以下の特徴があります：
 * - 各行の先頭の余分なインデントを削除
 * - タブ文字は2スペース分として計算
 * - 文字列中間の空行は保持
 * - 文字列の先頭と末尾の空行は削除
 * 
 * @example
 * ```typescript
 * // 基本的な使用方法
 * const result = dedent`
 *   const a = 1;
 *     const b = 2;
 * `;
 * // => "const a = 1;\n  const b = 2;"
 * 
 * // wrapオプション付きの使用方法
 * const result = dedent({ wrap: true })`
 *   const a = 1;
 *   const b = 2;
 * `;
 * // => "\nconst a = 1;\nconst b = 2;\n"
 * ```
 */

interface DedentOptions {
  /** 結果の文字列の前後に改行を追加するかどうか */
  wrap?: boolean;
}

type DedentFunction = {
  /**
   * テンプレートリテラルのインデントを調整
   * @param strings テンプレートリテラルの文字列部分
   * @param values テンプレートリテラルの変数展開部分
   * @returns インデントが調整された文字列
   */
  (strings: TemplateStringsArray, ...values: (string | number)[]): string;

  /**
   * オプション付きでテンプレートリテラルのインデントを調整
   * @param options インデント調整のオプション
   * @returns テンプレートリテラル関数
   */
  (options: DedentOptions): (strings: TemplateStringsArray, ...values: (string | number)[]) => string;
};

export const dedent: DedentFunction = ((
  strings: TemplateStringsArray | DedentOptions,
  ...values: (string | number)[]
) => {
  // オプションとして呼び出された場合
  if (!Array.isArray(strings) && typeof strings === "object") {
    const options = strings as DedentOptions;
    return (actualStrings: TemplateStringsArray, ...actualValues: (string | number)[]) => {
      return processTemplate(actualStrings, actualValues, options);
    };
  }

  // 直接呼び出された場合
  return processTemplate(strings as TemplateStringsArray, values, {});
}) as DedentFunction;

/**
 * テンプレートリテラルの処理を行う内部関数
 * 
 * @param strings テンプレートリテラルの文字列部分
 * @param values テンプレートリテラルの変数展開部分
 * @param options インデント調整のオプション
 * @returns 処理された文字列
 * 
 * @internal
 * この関数は内部実装の詳細です：
 * 1. テンプレートリテラルの文字列を結合
 * 2. 各行のインデントを計算（タブは2スペース分として計算）
 * 3. 最小インデントを基準に各行のインデントを調整
 * 4. オプションに応じて改行を追加
 */
const processTemplate = (
  strings: TemplateStringsArray,
  values: (string | number)[],
  options: DedentOptions
) => {
  // テンプレートリテラルの中身を結合
  const rawString = strings.reduce((acc, str, i) => acc + str + (values[i]?.toString() || ""), "");

  // 行を処理
  const lines = rawString.split("\n");

  // 先頭と末尾の空行を削除
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

  // 空の入力の場合
  if (lines.length === 0) return "";

  // 最小インデントの取得（空行を除く）
  const nonEmptyLines = lines.filter((line) => line.trim() !== "");
  const indentLengths = nonEmptyLines.map((line) => {
    const match = line.match(/^[ \t]*/);
    if (!match) return 0;
    // タブを2スペースとして計算
    const indentStr = match[0];
    let length = 0;
    for (let i = 0; i < indentStr.length; i++) {
      length += indentStr[i] === "\t" ? 2 : 1;
    }
    return length;
  });
  const minIndent = Math.min(...indentLengths);

  // インデントの除去
  const dedentedLines = lines.map((line) => {
    if (line.trim() === "") return "";

    const indentMatch = line.match(/^[ \t]*/);
    if (!indentMatch) return line;

    const indentStr = indentMatch[0];
    let currentLength = 0;
    let i = 0;

    // 最小インデントに達するまでの文字数を計算
    while (currentLength < minIndent && i < indentStr.length) {
      currentLength += indentStr[i] === "\t" ? 2 : 1;
      i++;
    }

    return line.slice(i);
  });

  // 結果の文字列を作成
  const result = dedentedLines.join("\n");

  // 改行の制御
  if (options.wrap) {
    return `\n${result}\n`;
  }

  return result;
};