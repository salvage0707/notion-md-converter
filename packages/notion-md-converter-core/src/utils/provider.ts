import { HTMLUtils } from "./html";
import type { CaptionMetadata } from "./transformer";

const getType = (url: string) => {
  const urlObj = new URL(url);
  const domain = urlObj.hostname;
  const path = urlObj.pathname;

  if (["x.com", "twitter.com"].includes(domain)) {
    return "x";
  }
  if (["codesandbox.io"].includes(domain)) {
    return "codesandbox";
  }
  if (["codepen.io"].includes(domain)) {
    return "codepen";
  }
  if (["github.com"].includes(domain)) {
    return "github";
  }
  if (["gist.github.com"].includes(domain)) {
    return "github-gist";
  }
  if (["asciinema.org"].includes(domain)) {
    return "asciinema";
  }
  if (["www.figma.com", "figma.com"].includes(domain)) {
    return "figma";
  }
  if (["speakerdeck.com"].includes(domain)) {
    return "speaker-deck";
  }
  if (["www.slideshare.net", "slideshare.net"].includes(domain)) {
    return "slideshare";
  }
  if (["docs.google.com"].includes(domain) && path.startsWith("/presentation/d/")) {
    return "google-slide";
  }
  if (["www.docswell.com", "docswell.com"].includes(domain)) {
    return "docswell";
  }
  if (["www.youtube.com", "youtube.com"].includes(domain)) {
    return "youtube";
  }
  if (["jsfiddle.net"].includes(domain)) {
    return "jsfiddle";
  }
  if (["codesandbox.io"].includes(domain)) {
    return "codesandbox";
  }
  if (["stackblitz.com"].includes(domain)) {
    return "stackblitz";
  }
  if (["blueprintue.com"].includes(domain)) {
    return "blueprintue";
  }
  return null;
};
export type ProviderType = Exclude<ReturnType<typeof getType>, null>;

/**
 * Youtube
 */
const getYoutubeVideoIdFromEmbedUrl = (url: string) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  return searchParams.get("v");
};

export type EmbedYoutubeOptions = {
  width?: string;
  height?: string;
};
const embedYoutube = (url: string, options: EmbedYoutubeOptions = {}) => {
  const videoId = getYoutubeVideoIdFromEmbedUrl(url);
  if (!videoId) {
    return null;
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
  const propertiesStr = HTMLUtils.objectToPropertiesStr(properties);
  return `<iframe ${propertiesStr}></iframe>`;
};

export const ProviderYoutubeUtils = {
  getVideoIdFromUrl: getYoutubeVideoIdFromEmbedUrl,
  embed: embedYoutube,
};

/**
 * CodePen
 */
export type EmbedCodePenOptions = {
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
  const propertiesStr = HTMLUtils.objectToPropertiesStr(properties);
  const mountTarget = `<p ${propertiesStr}></p>`;
  const script = `<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>`;
  return `${mountTarget}\n${script}`;
};

export const ProviderCodePenUtils = {
  embed: embedCodePen,
};

/**
 * Asciinema
 */
const embedAsciinema = (url: string) => {
  if (!url.endsWith(".js")) {
    return null;
  }

  const u = new URL(url);
  const id = u.pathname.split("/")[1].replace(".js", "");
  const properties = {
    id: `asciicast-${id}`,
    src: url,
    async: true,
  };
  const propertiesStr = HTMLUtils.objectToPropertiesStr(properties);
  return `<script ${propertiesStr}></script>`;
};

export const ProviderAsciinemaUtils = {
  embed: embedAsciinema,
};

/**
 * common
 */
export type EnableEmbed = {
  [key in ProviderType]?: boolean;
};
const embedByUrl = (url: string, metadata: CaptionMetadata = {}, options: { enableEmbed?: EnableEmbed } = {}) => {
  const enableEmbed = {
    youtube: true,
    codepen: true,
    asciinema: true,
    ...options.enableEmbed,
  };

  const provider = ProviderUtils.getType(url);
  if (!provider || !enableEmbed[provider]) {
    return null;
  }

  switch (provider) {
    case "youtube":
      return ProviderYoutubeUtils.embed(url, metadata);
    case "codepen":
      return ProviderCodePenUtils.embed(url, metadata);
    case "asciinema":
      return ProviderAsciinemaUtils.embed(url);
    default:
      return null;
  }
};

export const ProviderUtils = {
  getType,
  embedByUrl,
};
