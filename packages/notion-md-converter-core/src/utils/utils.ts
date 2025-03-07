export const isURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const getProvider = (url: string) => {
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
export type Provider = ReturnType<typeof getProvider>;

export const getYoutubeVideoIdFromEmbedUrl = (url: string) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  return searchParams.get("v");
};
