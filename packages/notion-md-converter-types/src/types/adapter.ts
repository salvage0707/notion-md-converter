import type { FileObject } from "./notion";

export type FileAdapter = (fileObject: FileObject) => {
  url: string;
};

export type FileAdapterFactory = (
  execute: (args: {
    type: FileObject["type"];
    url: string;
    expiryTime?: string;
  }) => {
    url: string;
  },
) => FileAdapter;
