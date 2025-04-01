import type { ApiColor, ColorMap } from "@notion-md-converter/types";
import { HTMLUtils } from "./html";

/**
 * @see https://www.markdownguide.org/basic-syntax/#reference-style-links
 */

export type BulletStyle = "-" | "*" | "+";

export type TableCell = {
  content: string;
};

export type TableHeader = {
  content: string;
  alignment?: "left" | "center" | "right";
};

/**
 * Heading
 */

const heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6): string => {
  return `${"#".repeat(level)} ${text}`;
};

/**
 * テキストスタイル変換
 */
const COLOR_MAP: ColorMap = {
  default: undefined,
  default_background: undefined,
  red: "#A83232",
  red_background: "#E8CCCC",
  orange: "#C17F46",
  orange_background: "#E8D5C2",
  yellow: "#9B8D27",
  yellow_background: "#E6E6C8",
  brown: "#8B6C55",
  brown_background: "#E0D5CC",
  green: "#4E7548",
  green_background: "#D5E0D1",
  blue: "#3A6B9F",
  blue_background: "#D0DEF0",
  purple: "#6B5B95",
  purple_background: "#D8D3E6",
  pink: "#B5787D",
  pink_background: "#E8D5D8",
  gray: "#777777",
  gray_background: "#D0D0D0",
} as const;

const BACKGROUND_COLOR_KEY = [
  "red_background",
  "orange_background",
  "yellow_background",
  "green_background",
  "blue_background",
  "purple_background",
  "pink_background",
  "gray_background",
  "brown_background",
];
const TEXT_COLOR_KEY = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "gray",
  "brown",
];

type DecorationFuncOption = {
  decoration: string;
};
const decoration = (text: string, options: DecorationFuncOption) => {
  // 空文字列や空白のみの場合は処理しない
  if (!text || !text.trim()) {
    return text;
  }

  // 正規表現を使って先頭と末尾の空白をキャプチャしながら内部テキストも取得
  const match = text.match(/^(\s*)(.+?)(\s*)$/);

  if (!match) {
    return text; // マッチしない場合は元のテキストを返す
  }

  const [, leadingSpaces, content, trailingSpaces] = match;
  const { decoration } = options;

  // 前後の空白を保持しつつ、内部テキストを装飾記号で囲む
  return `${leadingSpaces}${decoration}${content}${decoration}${trailingSpaces}`;
};

const bold = (text: string): string => {
  // decoration関数を使用（空文字列や空白のみの場合は内部で処理される）
  return decoration(text, { decoration: "**" });
};

const italic = (text: string): string => {
  // decoration関数を使用（空文字列や空白のみの場合は内部で処理される）
  return decoration(text, { decoration: "*" });
};

const strikethrough = (text: string): string => {
  // decoration関数を使用（空文字列や空白のみの場合は内部で処理される）
  return decoration(text, { decoration: "~~" });
};

const inlineCode = (text: string): string => {
  return `\`${text}\``;
};

const underline = (text: string): string => {
  return `_${text}_`;
};

const color = (text: string, color: ApiColor, colorMap: ColorMap = COLOR_MAP): string => {
  if (!text || !text.trim()) {
    return text;
  }

  const spanProps: {
    style?: string;
  } = {};

  // カラーコードが得られる場合のみスタイルを適用
  const colorCode = colorMap[color];
  if (!colorCode) {
    return text;
  }

  if (BACKGROUND_COLOR_KEY.includes(color)) {
    spanProps.style = `background-color: ${colorCode};`;
  } else if (TEXT_COLOR_KEY.includes(color)) {
    spanProps.style = `color: ${colorCode};`;
  }

  if (Object.keys(spanProps).length > 0) {
    const propsStr = HTMLUtils.objectToPropertiesStr(spanProps);
    return `<span ${propsStr}>${text}</span>`;
  }

  return text;
};

/**
 * リスト変換
 */
const bulletList = (text: string, style: BulletStyle = "-"): string => {
  return `${style} ${text}`;
};

const numberedList = (text: string, number: number): string => {
  return `${number}. ${text}`;
};

const checkList = (text: string, checked: boolean): string => {
  return `- [${checked ? "x" : " "}] ${text}`;
};

/**
 * リンク関連
 */
const link = (text: string, url: string): string => {
  return `[${text}](${url})`;
};

/**
 * 画像変換
 */
const image = (text: string, url: string, options: { width?: string } = {}): string => {
  const { width } = options;
  let urlText = url;
  if (width) {
    urlText += ` =${width}x`;
  }
  return `![${text}](${urlText})`;
};

/**
 * コードブロック変換
 */
const codeBlock = (code: string, language?: string): string => {
  return `\`\`\`${language || ""}\n${code}\n\`\`\``;
};

/**
 * 数式変換
 */
const blockEquation = (equation: string) => {
  return `$$\n${equation}\n$$`;
};

const inlineEquation = (equation: string) => {
  return `$${equation}$`;
};

/**
 * 引用変換
 */
const blockquote = (text: string): string => {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
};

/**
 * テーブル変換
 */
const table = (headers: TableHeader[], rows: TableCell[][]): string => {
  // 各列の最大長を計算
  const columnWidths = headers.map((header, index) => {
    const cellsInColumn = [header.content, ...rows.map((row) => row[index].content)];
    const maxLength = Math.max(...cellsInColumn.map((content) => content.length));
    return maxLength < 3 ? 3 : maxLength;
  });

  // ヘッダー行を生成（パディングを追加）
  const headerRow = `| ${headers.map((h, i) => h.content.padEnd(columnWidths[i])).join(" | ")} |`;

  // セパレータ行を生成（長さを合わせる）
  const alignmentRow = `| ${headers
    .map((h, i) => {
      const width = columnWidths[i];
      switch (h.alignment) {
        case "left":
          return `:${"-".repeat(width - 1)}`;
        case "center":
          return `:${"-".repeat(width - 2)}:`;
        case "right":
          return `${"-".repeat(width - 1)}:`;
        default:
          return "-".repeat(width);
      }
    })
    .join(" | ")} |`;

  // データ行がない場合は、ヘッダーとセパレータ行のみを返す
  if (rows.length === 0) {
    return `${headerRow}\n${alignmentRow}`;
  }

  // データ行を生成（パディングを追加）
  const dataRows = rows
    .map((row) => `| ${row.map((cell, i) => cell.content.padEnd(columnWidths[i])).join(" | ")} |`)
    .join("\n");

  return `${headerRow}\n${alignmentRow}\n${dataRows}`;
};

/**
 * 水平線変換
 */
const horizontalRule = (style: "hyphen" | "asterisk" | "underscore" = "hyphen"): string => {
  switch (style) {
    case "hyphen":
      return "---";
    case "asterisk":
      return "***";
    case "underscore":
      return "___";
  }
};

/**
 * 文字列を改行で囲む
 */
const wrapWithNewLines = (text: string): string => {
  return `\n${text}\n`;
};

/**
 * 文字列の各行にインデントを追加
 */
const indent = (text: string, spaces = 2): string => {
  return text
    .split("\n")
    .map((line) => (line === "" ? line : `${" ".repeat(spaces)}${line}`))
    .join("\n");
};

/**
 * detailsタグに変換
 */
const details = (title: string, content: string): string => {
  // summaryでインデントを入れるとnest構造がおかしくなる時があるので、インデントを入れない
  const result = [
    "<details>",
    "<summary>",
    title,
    "</summary>",
    "", // 改行
    content,
    "</details>",
  ].join("\n");
  return result;
};

/**
 * コメント
 */
const comment = (text: string): string => {
  return `<!-- ${text} -->`;
};

export const MarkdownUtils = {
  heading,
  bold,
  italic,
  strikethrough,
  inlineCode,
  underline,
  color,
  bulletList,
  numberedList,
  checkList,
  link,
  image,
  codeBlock,
  blockEquation,
  inlineEquation,
  blockquote,
  table,
  horizontalRule,
  wrapWithNewLines,
  indent,
  details,
  comment,
  decoration,
  COLOR_MAP,
};
