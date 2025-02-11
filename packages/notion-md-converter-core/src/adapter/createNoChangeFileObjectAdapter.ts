import { createFileAdapter } from "./createFileAdapter";

export const createNoChangeFileObjectAdapter = () => {
  return createFileAdapter(({ url }) => {
    return {
      url,
    };
  });
};
