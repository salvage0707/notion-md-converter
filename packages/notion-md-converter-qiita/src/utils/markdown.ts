import type { CodeLanguage, CodeLanguageMapping } from "@notion-md-converter/core/types";

/**
 * @see https://qiita.com/Qiita/items/c686397e4a0f4f11683d
 */

/**
 * Note
 */
const note = (text: string, color: "info" | "warn" | "alert" = "info") => {
  return [`:::note ${color}`, text, ":::"].join("\n");
};

/**
 * コードブロック変換
 */
const CODE_LANGUAGE_MAPPING: CodeLanguageMapping = {
  "ascii art": undefined, // リストに未対応のため、undefinedにする
  abap: "abap",
  agda: undefined, // リストに未対応のため、undefinedにする
  arduino: undefined, // リストに未対応のため、undefinedにする
  assembly: "nasm", // 最も近いassembly関連言語としてnasmを使用
  bash: "shell",
  basic: "bbcbasic", // BBCBASICをBASICとして使用
  bnf: undefined, // リストに未対応のため、undefinedにする
  c: "c",
  "c#": "csharp",
  "c++": "cpp",
  clojure: "clojure",
  coffeescript: "coffeescript",
  coq: "coq",
  css: "css",
  dart: "dart",
  dhall: undefined, // リストに未対応のため、undefinedにする
  diff: "diff",
  docker: "docker",
  ebnf: undefined, // リストに未対応のため、undefinedにする
  elixir: "elixir",
  elm: "elm",
  erlang: "erlang",
  "f#": "fsharp",
  flow: undefined, // リストに未対応のため、undefinedにする
  fortran: "fortran",
  gherkin: "gherkin",
  glsl: "glsl",
  go: "go",
  graphql: "graphql",
  groovy: "groovy",
  haskell: "haskell",
  html: "html",
  idris: "idris",
  java: "java",
  javascript: "javascript",
  json: "json",
  julia: "julia",
  kotlin: "kotlin",
  latex: "tex", // LaTeXはTeXのサブセット
  less: undefined, // リストに未対応のため、undefinedにする
  lisp: "common_lisp",
  livescript: "livescript",
  "llvm ir": "llvm",
  lua: "lua",
  makefile: "make",
  markdown: "markdown",
  markup: "xml", // 汎用マークアップとしてXML
  matlab: "matlab",
  mathematica: "mathematica",
  mermaid: undefined, // リストに未対応のため、undefinedにする
  nix: "nix",
  "notion formula": undefined, // リストに未対応のため、undefinedにする
  "objective-c": "objective_c",
  ocaml: "ocaml",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  "plain text": "plaintext",
  powershell: "powershell",
  prolog: "prolog",
  protobuf: "protobuf",
  purescript: undefined, // リストに未対応のため、undefinedにする
  python: "python",
  r: "r",
  racket: "racket",
  reason: "reasonml",
  ruby: "ruby",
  rust: "rust",
  sass: "sass",
  hcl: "hcl",
  smalltalk: "smalltalk",
  scala: "scala",
  scheme: "scheme",
  scss: "scss",
  shell: "shell",
  solidity: undefined, // リストに未対応のため、undefinedにする
  sql: "sql",
  swift: "swift",
  toml: "toml",
  typescript: "typescript",
  "vb.net": "vb", // Visual Basic .NETは一般的にVisual Basicとして扱われる
  verilog: "verilog",
  vhdl: "vhdl",
  "visual basic": "vb",
  webassembly: undefined, // リストに未対応のため、undefinedにする
  xml: "xml",
  yaml: "yaml",
  "java/c/c++/c#": "java", // 複合的な言語指定だがjavaとして扱う
};

const codeBlock = (
  code: string,
  options: { diff?: boolean; language?: CodeLanguage; filename?: string } = {},
) => {
  const { diff = false, language, filename } = options;

  let prefix = "";
  if (language && CODE_LANGUAGE_MAPPING[language]) {
    const lang = CODE_LANGUAGE_MAPPING[language];
    prefix += diff ? `diff_${lang}` : lang;
  }
  if (filename) {
    prefix += `:${filename}`;
  }
  return `\`\`\`${prefix}\n${code}\n\`\`\``;
};

const equationBlock = (equation: string) => {
  return `\`\`\`math\n${equation}\n\`\`\``;
};

export const QiitaMarkdownUtils = {
  codeBlock,
  equationBlock,
  note,
};
