import type { FileObject } from "../types";
import { isNotionInternalFile } from "../utils";
import type { FileAdaptor } from "./FileAdaptor";

export class NoChangeFileObjectAdaptor implements FileAdaptor {
  execute(fileObject: FileObject) {
    if (isNotionInternalFile(fileObject)) {
      // MEMO: Notionにホストされているファイルは1時間の有効期限を持っている
      return {
        url: fileObject.file.url,
      };
    }

    return {
      url: fileObject.external.url,
    };
  }
}
