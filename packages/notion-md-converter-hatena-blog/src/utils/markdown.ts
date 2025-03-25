/**
 * @see https://github.com/salvage0707/notion-md-converter/issues/38
 * @see https://help.hatenablog.com/entry/text-hatena-list
 */

/**
 * コードブロック変換
 * @see https://help.hatenablog.com/entry/markup/syntaxhighlight
 */
const CODE_LANGUAGE_MAPPING = {
  "ascii art": undefined, // リストに未対応のため、undefinedにする
  abap: "abap",
  agda: undefined, // リストに未対応のため、undefinedにする
  arduino: undefined, // リストに未対応のため、undefinedにする
  assembly: "nasm", // 最も近いassembly関連言語としてnasmを使用
  bash: "sh",
  basic: "basic",
  bnf: undefined, // リストに未対応のため、undefinedにする
  c: "c",
  "c#": "cs",
  "c++": "cpp",
  clojure: "clojure",
  coffeescript: "coffee",
  coq: undefined, // リストに未対応
  css: "css",
  dart: "dart",
  dhall: undefined, // リストに未対応のため、undefinedにする
  diff: "diff",
  docker: undefined, // リストに未対応
  ebnf: undefined, // リストに未対応のため、undefinedにする
  elixir: "elixir",
  elm: undefined, // リストに未対応
  erlang: "erlang",
  "f#": "fsharp",
  flow: undefined, // リストに未対応のため、undefinedにする
  fortran: "fortran",
  gherkin: "cucumber",
  glsl: "glsl",
  go: "go",
  graphql: undefined, // リストに未対応
  groovy: "groovy",
  haskell: "haskell",
  html: "html",
  idris: undefined, // リストに未対応
  java: "java",
  javascript: "javascript",
  json: "json",
  julia: "julia",
  kotlin: "kotlin",
  latex: "tex", // LaTeXはTeXのサブセット
  less: undefined, // リストに未対応のため、undefinedにする
  lisp: "lisp",
  livescript: undefined, // リストに未対応
  "llvm ir": undefined, // リストに未対応
  lua: "lua",
  makefile: "make",
  markdown: "markdown",
  markup: "xml", // 汎用マークアップとしてXML
  matlab: "matlab",
  mathematica: "mma",
  mermaid: undefined, // リストに未対応のため、undefinedにする
  nix: undefined, // リストに未対応
  "notion formula": undefined, // リストに未対応のため、undefinedにする
  "objective-c": "objc",
  ocaml: "ocaml",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  "plain text": undefined, // リストに未対応
  powershell: "ps1",
  prolog: "prolog",
  protobuf: "proto",
  purescript: undefined, // リストに未対応のため、undefinedにする
  python: "python",
  r: "r",
  racket: undefined, // リストに未対応
  reason: undefined, // リストに未対応
  ruby: "ruby",
  rust: "rust",
  sass: "sass",
  hcl: "hcl",
  smalltalk: undefined, // リストに未対応
  scala: "scala",
  scheme: "scheme",
  scss: undefined, // リストに未対応
  shell: "sh",
  solidity: undefined, // リストに未対応のため、undefinedにする
  sql: "sql",
  swift: "swift",
  toml: undefined, // リストに未対応
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

/**
 * 引用変換
 */
const blockquote = (text: string): string => {
  const quoteText = text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
  // separatorを入れないと連続した引用が結合されて表示されるため追加
  const separator = "<!------->";
  return `${quoteText}\n${separator}`;
};

export const HatenaBlogMarkdownUtils = {
  CODE_LANGUAGE_MAPPING,
  blockquote,
};
