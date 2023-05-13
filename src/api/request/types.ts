import type { AxiosProgressEvent } from 'axios'

interface ResponseResult<T = any> {
  message: string,
  code: number,
  data: T
}

interface UploadConfig {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export type {
  ResponseResult,
  UploadConfig
}