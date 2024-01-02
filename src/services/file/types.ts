export interface FileRecord {
  path: string;
}

export interface StorageFile {
  path: string;
  created_at: string;
  size: number;
}

export interface SingleFileUpload {
  name: string;
  bucket_name: string;
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface SplashFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface MultiFileUpload {
  names: string[];
  bucket_name: string;
  files: any[];
}
