import request from "./axios";
import { RequestMethodEnum } from '@constant/httpConstant'
import type { UploadConfig } from './types'

const http = {
  get<T = any>(url: string, params?: object) {
    return request<T>(url, RequestMethodEnum.GET, { params })
  },

  post<T = any>(url: string, data?: object) {
    return request<T>(url, RequestMethodEnum.POST, { data })
  },

  put<T = any>(url: string, data?: object) {
    return request<T>(url, RequestMethodEnum.PUT, { data })
  },

  delete<T = any>(url: string, data?: object) {
    return request<T>(url, RequestMethodEnum.DELETE, { data })
  },

  upload<T = any>(url: string, data: FormData, config?: UploadConfig) {
    return request<T>(url, RequestMethodEnum.POST, { data, ...config })
  },
}

export default http