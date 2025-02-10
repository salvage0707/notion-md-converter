import type { ApiColor, RichText } from "../types";

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
type ColorMap = {
  [key in ApiColor]: string;
};

export const COLOR_MAP: ColorMap = {
  default: "no used",
  red: "red",
  red_background: "red",
  orange: "orange",
  orange_background: "orange",
  yellow: "yellow",
  yellow_background: "yellow",
  green: "green",
  green_background: "green",
  blue: "blue",
  blue_background: "blue",
  purple: "purple",
  purple_background: "purple",
  pink: "pink",
  pink_background: "pink",
  gray: "gray",
  gray_background: "gray",
  brown: "brown",
  brown_background: "brown",
};

const bold = (text: string): string => {
  return `**${text}**`;
};

const italic = (text: string): string => {
  return `*${text}*`;
};

const strikethrough = (text: string): string => {
  return `~~${text}~~`;
};

const inlineCode = (text: string): string => {
  return `\`${text}\``;
};

const underline = (text: string): string => {
  return `_${text}_`;
};

const convertToColor = (text: string, color: ApiColor): string => {
  return `<span style="color: ${COLOR_MAP[color]}">${text}</span>`;
};

/**
 * リスト変換
 */
const bulletList = (text: string, style: BulletStyle = "-"): string => {
  return `${style} ${text}`;
};

const convertToNumberedList = (text: string, number: number): string => {
  return `${number}. ${text}`;
};

const convertToCheckList = (text: string, checked: boolean): string => {
  return `- [${checked ? "x" : " "}] ${text}`;
};

/**
 * リンク関連
 */
const convertToLink = (text: string, url: string): string => {
  return `[${text}](${url})`;
};

const convertToReferenceLink = (
  text: string,
  referenceId: string,
  url: string
): string => {
  return `[${text}][${referenceId}]\n[${referenceId}]: ${url}`;
};

/**
 * 画像変換
 */
const convertToImage = (text: string, url: string): string => {
  return `![${text}](${url})`;
};

/**
 * コードブロック変換
 */
const convertToCodeBlock = (code: string, language?: string): string => {
  return `\`\`\`${language || ""}\n${code}\n\`\`\``;
};

const convertToIndentedCodeBlock = (code: string): string => {
  return code
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
};

/**
 * 引用変換
 */
const convertToBlockquote = (text: string): string => {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
};

/**
 * テーブル変換
 */
const convertToTable = (
  headers: TableHeader[],
  rows: TableCell[][]
): string => {
  // 各列の最大長を計算
  const columnWidths = headers.map((header, index) => {
    const cellsInColumn = [
      header.content,
      ...rows.map((row) => row[index].content),
    ];
    const maxLength = Math.max(
      ...cellsInColumn.map((content) => content.length)
    );
    return maxLength < 3 ? 3 : maxLength;
  });

  // ヘッダー行を生成（パディングを追加）
  const headerRow = `| ${headers
    .map((h, i) => h.content.padEnd(columnWidths[i]))
    .join(" | ")} |`;

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
    .map(
      (row) =>
        `| ${row
          .map((cell, i) => cell.content.padEnd(columnWidths[i]))
          .join(" | ")} |`
    )
    .join("\n");

  return `${headerRow}\n${alignmentRow}\n${dataRows}`;
};

/**
 * 水平線変換
 */
const convertToHorizontalRule = (
  style: "hyphen" | "asterisk" | "underscore" = "hyphen"
): string => {
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
    .map((line) => `${" ".repeat(spaces)}${line}`)
    .join("\n");
};

/**
 * detailsタグに変換
 */
const convertToDetails = (title: string, content: string): string => {
  const result = [
    "<details>",
    indent("<summary>"),
    indent(`${title}`, 4),
    indent("</summary>"),
    "", // 改行
    indent(content),
    "</details>",
  ].join("\n");
  return result;
};

/**
 * videoタグに変換
 */
const convertToVideo = (url: string): string => {
  return `<video controls src="${url}"></video>`;
};

/**
 * リッチテキストをMarkdownに変換
 */
export type EnableAnnotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: boolean | ColorMap;
};

export const convertRichTextsToMarkdown = (
  richTexts: RichText[],
  enableAnnotations: EnableAnnotations = {
    bold: true,
    italic: true,
    strikethrough: true,
    underline: true,
    code: true,
    color: false, // By default, do not add color
  }
): string => {
  const convertToMarkdown = (
    text: RichText,
    enableAnnotations: EnableAnnotations
  ): string => {
    let markdown = text.plain_text;
    if (text.annotations.bold && enableAnnotations.bold) {
      markdown = bold(markdown);
    }
    if (text.annotations.italic && enableAnnotations.italic) {
      markdown = italic(markdown);
    }
    if (text.annotations.strikethrough && enableAnnotations.strikethrough) {
      markdown = strikethrough(markdown);
    }
    if (text.annotations.underline && enableAnnotations.underline) {
      markdown = underline(markdown);
    }
    if (text.annotations.code && enableAnnotations.code) {
      markdown = inlineCode(markdown);
    }
    if (
      text.annotations.color &&
      text.annotations.color !== "default" &&
      enableAnnotations.color
    ) {
      markdown = convertToColor(markdown, text.annotations.color);
    }
    return markdown;
  };

  return richTexts
    .map((text) => convertToMarkdown(text, enableAnnotations))
    .join("");
};

export const MarkdownUtils = {
  heading,
  bold,
  italic,
  strikethrough,
  inlineCode,
  underline,
  bulletList,
  convertToNumberedList,
  convertToCheckList,
  convertToLink,
  convertToReferenceLink,
  convertToImage,
  convertToCodeBlock,
  convertToIndentedCodeBlock,
  convertToBlockquote,
  convertToTable,
  convertToHorizontalRule,
  wrapWithNewLines,
  indent,
  convertToDetails,
  convertToVideo,
  convertRichTextsToMarkdown,
};
