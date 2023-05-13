import http from './request/http'
import { setRestfulStyleParams, setFormDataParams } from '@/utils/requestParamsTools'
interface GetAdminList {
  pageNum: number,
  pageSize: number
}
function getAdminList(argu: GetAdminList) {
  return http.get('/admin/list', argu)
}

interface PostAdmin {
  adminName: string,
  adminPassword: string,
  adminTel: string,
  adminEmail: string,
  roleId: string
}
function postAdmin(argu: PostAdmin) {
  const formData = setFormDataParams(argu)
  return http.post('/admin', formData)
}

interface GetAdmin {
  adminId: string
}
function getAdmin(argu: GetAdmin) {
  const params = setRestfulStyleParams(argu)
  return http.get('/admin' + params)
}
export {
  getAdminList,
  postAdmin,
  getAdmin
}