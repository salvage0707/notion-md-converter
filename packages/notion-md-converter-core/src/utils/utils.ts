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
  if (["gist.github.com"].includes(domain)) {
    return "github-gist";
  }
  if (["asciinema.org"].includes(domain)) {
    return "asciinema";
  }
  if (["www.figma.com"].includes(domain)) {
    return "figma";
  }
  if (["speakerdeck.com"].includes(domain)) {
    return "speakerdeck";
  }
  if (["www.slideshare.net"].includes(domain)) {
    return "slideshare";
  }
  if (["docs.google.com"].includes(domain) && path.startsWith("/presentation/d/")) {
    return "google-slide";
  }
  if (["www.docswell.com"].includes(domain)) {
    return "docswell";
  }
  if (["www.youtube.com"].includes(domain)) {
    return "youtube";
  }
  return null;
};
export type Provider = ReturnType<typeof getProvider>;
