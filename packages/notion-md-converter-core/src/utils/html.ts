const objectToPropertiesStr = (object: Record<string, string | boolean | undefined | null>) => {
  return Object.entries(object)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
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

type ObjectTagOptions = {
  data: string;
  width?: string;
  height?: string;
  type: "application/pdf";
};
const objectTag = (options: ObjectTagOptions) => {
  const properties = objectToPropertiesStr({
    data: options.data,
    type: options.type,
    width: options.width ?? "100%",
    height: options.height ?? "250",
  });
  return `<object ${properties}></object>`;
};

type VideoTagOptions = {
  src: string;
  controls?: boolean;
  width?: string;
  height?: string;
};
const videoTag = (options: VideoTagOptions) => {
  const properties = objectToPropertiesStr({
    src: options.src,
    controls: options.controls ?? true,
    width: options.width,
    height: options.height,
  });
  return `<video ${properties}></video>`;
};
export const HTMLUtils = {
  objectToPropertiesStr,
  objectTag,
  videoTag,
};
