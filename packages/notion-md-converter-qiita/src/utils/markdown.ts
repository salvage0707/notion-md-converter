import { getProvider, getYoutubeVideoIdFromEmbedUrl } from "@notion-md-converter/core";
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
  mermaid: "mermaid", // リストに未対応のため、undefinedにする
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

const objectToPropertiesStr = (object: Record<string, string | boolean>) => {
  return Object.entries(object)
    .map(([key, value]) => {
      if (value === undefined) {
        return null;
      }
      if (typeof value === "boolean") {
        return value ? key : null;
      }
      return `${key}="${value}"`;
    })
    .filter((v) => !!v)
    .join(" ");
};

const equationBlock = (equation: string) => {
  return `\`\`\`math\n${equation}\n\`\`\``;
};

const linkCard = (url: string) => {
  // 上下に空行を入れる必要あり
  return url;
};

const embedX = (url: string) => {
  return url;
};

const embedCodeSandbox = (url: string) => {
  return url;
};

type EmbedCodePenOptions = {
  height?: string;
  defaultTab?: string;
};
const embedCodePen = (url: string, options: EmbedCodePenOptions = {}) => {
  // ex) https://codepen.io/tomoasleep/pen/dJgNLK/
  const u = new URL(url);
  // ex) ["", "tomoasleep", "pen", "dJgNLK", ""]
  const paths = u.pathname.split("/");
  const slugHash = paths[3];
  const user = paths[1];
  const properties = {
    "data-height": options.height || "250",
    "data-theme-id": "0",
    "data-slug-hash": slugHash,
    "data-default-tab": options.defaultTab || "result",
    "data-user": user,
    "data-embed-version": "2",
    "data-pen-title": slugHash,
    class: "codepen",
  };
  // ex) data-height="300" data-theme-id="0" data-slug-hash="dJgNLK" ...
  const propertiesStr = Object.entries(properties)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  const mountTarget = `<p ${propertiesStr}></p>`;
  const script = `<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>`;
  return `${mountTarget}\n${script}`;
};

const embedGitHubGist = (url: string) => {
  return url;
};

const embedAsciinema = (url: string) => {
  if (!url.endsWith(".js")) {
    return linkCard(url);
  }

  const u = new URL(url);
  const id = u.pathname.split("/")[1].replace(".js", "");
  const properties = {
    id: `asciicast-${id}`,
    src: url,
    async: "",
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<script ${propertiesStr}></script>`;
};

type EmbedFigmaOptions = {
  height?: string;
  width?: string;
};
const embedFigma = (url: string, options: EmbedFigmaOptions = {}) => {
  const properties = {
    style: "border: 1px solid rgba(0, 0, 0, 0.1);",
    height: options.height || "450",
    width: options.width || "800",
    src: `https://www.figma.com/embed?embed_host=astra&url=${url}`,
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<iframe ${propertiesStr}></iframe>`;
};

const embedSpeakerDeck = (id: string) => {
  const properties = {
    async: true,
    class: "speakerdeck-embed",
    "data-id": id,
    "data-ratio": "1.77777777777778",
    src: "https://speakerdeck.com/assets/embed.js",
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<script ${propertiesStr}></script>`;
};

type EmbedSlideShareOptions = {
  width?: string;
  height?: string;
};
const embedSlideShare = (url: string, options: EmbedSlideShareOptions = {}) => {
  const properties = {
    src: url,
    width: options.width || "595",
    height: options.height || "485",
    frameborder: "0",
    marginwidth: "0",
    marginheight: "0",
    scrolling: "no",
    style: "border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;",
    loading: "lazy",
    allowfullscreen: true,
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<iframe ${propertiesStr}></iframe>`;
};

type EmbedGoogleSlideOptions = {
  width?: string;
  height?: string;
};
const embedGoogleSlide = (url: string, options: EmbedGoogleSlideOptions = {}) => {
  const properties = {
    src: url,
    frameborder: "0",
    width: options.width || "960",
    height: options.height || "569",
    allowfullscreen: true,
    mozallowfullscreen: true,
    webkitallowfullscreen: true,
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<iframe ${propertiesStr}></iframe>`;
};

const embedDocswell = (url: string) => {
  const properties = {
    src: "https://www.docswell.com/assets/libs/docswell-embed/docswell-embed.min.js",
    async: true,
    class: "docswell-embed",
    "data-src": url,
    "data-aspect": "0.5625",
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<script ${propertiesStr}></script>`;
};

type EmbedYoutubeOptions = {
  width?: string;
  height?: string;
};
const embedYoutube = (url: string, options: EmbedYoutubeOptions = {}) => {
  const videoId = getYoutubeVideoIdFromEmbedUrl(url);
  if (!videoId) {
    return url;
  }

  const properties = {
    width: options.width || "560",
    height: options.height || "315",
    src: `https://www.youtube.com/embed/${videoId}`,
    frameborder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    loading: "lazy",
    allowfullscreen: true,
  };
  const propertiesStr = objectToPropertiesStr(properties);
  return `<iframe ${propertiesStr}></iframe>`;
};

/**
 * @description
 * unsuporterd embed by url
 * - speakerdeck
 *
 * unsupported embed option type
 * - codepen
 * - figma
 * - google-slide
 * - youtube
 */
const embedByURL = (url: string): { result: string; isEmbed: boolean } => {
  const provider = getProvider(url);
  if (!provider) {
    return { result: url, isEmbed: false };
  }
  switch (provider) {
    case "x":
      return { result: embedX(url), isEmbed: true };
    case "codesandbox":
      return { result: embedCodeSandbox(url), isEmbed: true };
    case "codepen":
      return { result: embedCodePen(url), isEmbed: true };
    case "github-gist":
      return { result: embedGitHubGist(url), isEmbed: true };
    case "asciinema":
      return { result: embedAsciinema(url), isEmbed: url.endsWith(".js") };
    case "figma":
      return { result: embedFigma(url), isEmbed: true };
    case "speaker-deck":
      return { result: url, isEmbed: true };
    case "slideshare":
      return { result: embedSlideShare(url), isEmbed: true };
    case "google-slide":
      return { result: embedGoogleSlide(url), isEmbed: true };
    case "docswell":
      return { result: embedDocswell(url), isEmbed: true };
    case "youtube":
      return { result: embedYoutube(url), isEmbed: true };
    default:
      return { result: url, isEmbed: false };
  }
};

export const QiitaMarkdownUtils = {
  codeBlock,
  equationBlock,
  note,
  linkCard,
  embedX,
  embedCodeSandbox,
  embedCodePen,
  embedGitHubGist,
  embedAsciinema,
  embedFigma,
  embedSpeakerDeck,
  embedSlideShare,
  embedGoogleSlide,
  embedDocswell,
  embedYoutube,
  embedByURL,
};
