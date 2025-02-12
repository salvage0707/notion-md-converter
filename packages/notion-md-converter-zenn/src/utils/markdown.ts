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
const codeBlock = (code: string, diff = false, language = "", filename = "") => {
  const languagePrefix = diff ? `diff ${language}` : language;
  const filenamePrefix = filename ? `:${filename}` : "";
  return `\`\`\`${languagePrefix}${filenamePrefix}\n${code}\n\`\`\``;
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
};
