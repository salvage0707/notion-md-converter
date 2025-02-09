import type { FileObject } from "../types";

export interface FileAdaptor {
  execute(fileObject: FileObject): {
    url: string;
  };
}
