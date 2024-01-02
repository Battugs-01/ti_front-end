import { AntdFile } from "types";
import { FileRecord, MultiFileUpload, SingleFileUpload } from "./types";
import http from "..";

namespace file {
  export const upload = async ({
    name,
    bucket_name,
    file,
    onUploadProgress,
  }: SingleFileUpload) => {
    const body = new FormData();

    body.append("name", name);
    body.append("file", file);
    body.append("bucket_name", bucket_name);

    return http.post<FileRecord>("global/file/upload", {
      body,
      hasAuth: true,
      onUploadProgress: onUploadProgress,
    });
  };

  export const uploads = async ({
    files,
    names,
    bucket_name,
  }: MultiFileUpload) => {
    const body = new FormData();

    if (files.length === 0) {
      return [];
    }
    files.forEach((file, ind) => {
      body.append("names", names[ind]);
      body.append("files", file.originFileObj);
      body.append("bucket_name", bucket_name);
    });

    return http.post<FileRecord[]>("global/file/multi/upload", {
      body,
      hasAuth: true,
    });
  };

  export const fileToUrl = (val: string) => {
    return `${import.meta.env.VITE_FILE_GET_URL}${val}`;
  };

  export const getFileName = (val: string) => {
    return val.split("/").pop()?.substring(15);
  };

  export const getUploadableFiles = (val?: AntdFile[]) => {
    return val?.filter((item) => !!item.originFileObj) || [];
  };

  export const getPaths = (
    searchVal: string,
    uploadedItems: string[],
    existingItems?: AntdFile[]
  ) => {
    for (let val of existingItems || []) {
      if (val.uid.includes(searchVal)) {
        uploadedItems.push(val.uid);
      }
    }
    return uploadedItems;
  };
}

export default file;
