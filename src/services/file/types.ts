export interface FileRecord {
  id: any;
  path: string;
}

export interface StorageFile {
  path: string;
  created_at: string;
  size: number;
}

export interface SingleFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface SplashFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface MultiFileUpload {
  files: any[];
}
