import { createFileAdapter } from "./createFileAdapter";

export const createNoChangeFileObjectAdaptor = () => {
  return createFileAdapter(({ url }) => {
    return {
      url,
    };
  });
};
