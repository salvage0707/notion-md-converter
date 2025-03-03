import type { CodeLanguage, CodeLanguageMapping } from "@notion-md-converter/core/types";

/**
 * @see https://qiita.com/Qiita/items/c686397e4a0f4f11683d
 */

/**
 * Note
 */
const note = (text: string, color: "info" | "warn" | "alert" = "info") => {
  return [
    `:::note ${color}`,
    text,
    ":::",
  ].join("\n");
};

/**
 * コードブロック変換
 */
const CODE_LANGUAGE_MAPPING: CodeLanguageMapping = {
  "ascii art": "ascii",
  abap: "abap",
  agda: "agda",
  arduino: "arduino",
  assembly: "asm6502",
  bash: "bash",
  basic: "basic",
  bnf: "bnf",
  c: "c",
  "c#": "csharp",
  "c++": "cpp",
  clojure: "clojure",
  coffeescript: "coffeescript",
  coq: "coq",
  css: "css",
  dart: "dart",
  dhall: "dhall",
  diff: "diff",
  docker: "docker",
  ebnf: "ebnf",
  elixir: "elixir",
  elm: "elm",
  erlang: "erlang",
  "f#": "fsharp",
  flow: "flow",
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
  latex: "latex",
  less: "less",
  lisp: "lisp",
  livescript: "livescript",
  "llvm ir": "llvm",
  lua: "lua",
  makefile: "makefile",
  markdown: "markdown",
  markup: "markup",
  matlab: "matlab",
  mathematica: "wolfram",
  mermaid: "mermaid",
  nix: "nix",
  "notion formula": undefined,
  "objective-c": "objectivec",
  ocaml: "ocaml",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  "plain text": undefined,
  powershell: "powershell",
  prolog: "prolog",
  protobuf: "protobuf",
  purescript: "purescript",
  python: "python",
  r: "r",
  racket: "racket",
  reason: "reason",
  ruby: "ruby",
  rust: "rust",
  sass: "sass",
  hcl: "hcl",
  smalltalk: "smalltalk",
  scala: "scala",
  scheme: "scheme",
  scss: "scss",
  shell: "shell",
  solidity: "solidity",
  sql: "sql",
  swift: "swift",
  toml: "toml",
  typescript: "typescript",
  "vb.net": "vbnet",
  verilog: "verilog",
  vhdl: "vhdl",
  "visual basic": "visual-basic",
  webassembly: "wasm",
  xml: "xml",
  yaml: "yaml",
  "java/c/c++/c#": "java",
};
const codeBlock = (code: string, diff = false, language?: CodeLanguage, filename = "") => {
  let prefix = "";
  if (diff) {
    prefix = "diff ";
  }
  if (language && CODE_LANGUAGE_MAPPING[language]) {
    prefix += CODE_LANGUAGE_MAPPING[language];
  }
  if (filename) {
    prefix += `:${filename}`;
  }
  return `\`\`\`${prefix}\n${code}\n\`\`\``;
};

export const QiitaMarkdownUtils = {
  codeBlock,
  note,
};
