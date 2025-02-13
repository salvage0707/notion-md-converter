import type { CodeLanguage, CodeLanguageMapping } from "@notion-md-converter/core/types";
/**
 * @see https://zenn.dev/zenn/articles/markdown-guide
 */

/**
 * 画像変換
 */
const image = (text: string, url: string, caption = ""): string => {
  if (caption) {
    return `![${text}](${url}\n*"${caption}")*`;
  }
  return `![${text}](${url})`;
};

/**
 * コードブロック変換
 */
const CODE_LANGUAGE_MAPPING: CodeLanguageMapping = {
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

/**
 * detailsに変換
 */
const details = (title: string, content: string, wrap = false): string => {
  const wrapper = wrap ? "::::" : ":::";
  const details = title ? `details ${title}` : "details";
  return `${wrapper}${details}\n${content}\n${wrapper}`;
};

/**
 * messageに変換
 */
const message = (text: string, alert = false, wrap = false): string => {
  const wrapper = wrap ? "::::" : ":::";
  const message = alert ? "message alert" : "message";
  return `${wrapper}${message}\n${text}\n${wrapper}`;
};

/**
 * コンテンツ埋め込み
 */
const embedLinkCard = (url: string): string => {
  // URLそのままでOK
  return url;
};

const embedX = (url: string): string => {
  // URLそのままでOK
  return url;
};

const embedYoutube = (url: string): string => {
  // URLそのままでOK
  return url;
};

const embedGitHub = (url: string): string => {
  // URLそのままでOK
  return url;
};

const embedGitHubGist = (url: string): string => {
  return `@[gist](${url})`;
};

const embedCodePen = (url: string): string => {
  return `@[codepen](${url})`;
};

const embedSlideShare = (url: string): string => {
  return `@[slideshare](${url})`;
};

const embedSpeakerDeck = (slideId: string): string => {
  return `@[speakerdeck](${slideId})`;
};

const embedDocSwell = (url: string): string => {
  return `@[docswell](${url})`;
};

const embedJSFiddle = (url: string): string => {
  return `@[jsfiddle](${url})`;
};

const embedCodeSandbox = (url: string): string => {
  return `@[codesandbox](${url})`;
};

const embedStackBlitz = (url: string): string => {
  return `@[stackblitz](${url})`;
};

const embedFigma = (url: string): string => {
  return `@[figma](${url})`;
};

const embedBlueprintUE = (url: string): string => {
  return `@[blueprintue](${url})`;
};

const embedByURL = (url: string): string => {
  // TODO: 実装
  return url;
};

/**
 * - code block
 *   - 言語を追加
 * - 脚注
 *   - 脚注を追加
 */
export const ZennMarkdownUtils = {
  image,
  codeBlock,
  details,
  message,
  embedLinkCard,
  embedX,
  embedYoutube,
  embedGitHub,
  embedGitHubGist,
  embedCodePen,
  embedSlideShare,
  embedSpeakerDeck,
  embedDocSwell,
  embedJSFiddle,
  embedCodeSandbox,
  embedStackBlitz,
  embedFigma,
  embedBlueprintUE,
  embedByURL,
};
