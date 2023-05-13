import http from './request/http'
import { setRestfulStyleParams, setFormDataParams } from '@/utils/requestParamsTools'
import type { UploadConfig } from './request/types'
type UploadInformation = {
  informationName: string,
  collegeId: number,
  informationCategory: number,
  informationContent: File
}
function uploadInformation(argu: UploadInformation, config?: UploadConfig) {
  const formData = setFormDataParams(argu)
  return http.upload('/information', formData, config)
}

type PostInformationList = {
  pageNum: number,
  pageSize: number,
  informationType: number,
  informationStatus: number
}
function postInformationList(argu: PostInformationList) {
  return http.post('/information/list', argu)
}

type PutInformation = {
  informationId: number,
  informationName?: number,
  collegeId?: number,
  informationCategory?: number,
  informationStatus: string
}
function putInformation(argu: PutInformation) {
  const formData = setFormDataParams(argu)
  return http.put('/information', formData)
}

type DeleteInformation = {
  ids: Array<number>
}
function deleteInformation(argu: DeleteInformation) {
  return http.delete('/information', argu)
}
export {
  uploadInformation,
  postInformationList,
  putInformation,
  deleteInformation
}