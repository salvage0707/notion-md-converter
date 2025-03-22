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

export const HTMLUtils = {
  objectToPropertiesStr,
  objectTag,
};
