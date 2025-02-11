import type { FileAdapterFactory } from "../types";
import { isNotionInternalFile } from "../utils";

export const createFileAdapter: FileAdapterFactory = (execute) => {
  return (fileObject) => {
    if (isNotionInternalFile(fileObject)) {
      return execute({
        type: fileObject.type,
        url: fileObject.file.url,
        expiryTime: fileObject.file.expiry_time,
      });
    }

    return execute({
      type: fileObject.type,
      url: fileObject.external.url,
    });
  };
};
