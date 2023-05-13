import http from './request/http'

type GetRoleList = undefined
function getRoleList(argu: GetRoleList) {
  return http.get('/role/list', argu)
}

type PostRole = {
  roleName: string,
  roleKey: string,
  menuIds: Array<number>
}
function postRole(argu: PostRole) {
  return http.post('/role', argu)
}

type PutRole = {
  roleName: string,
  roleKey: string,
  menuIds: Array<number>,
  roleStatus: number,
  roleId: number
}
function putRole(argu: PutRole) {
  return http.put('/role', argu)
}

type DeleteRole = {
  ids: Array<number>
}
function deleteRole(argu: DeleteRole) {
  return http.delete('/role', argu)
}

export {
  getRoleList,
  postRole,
  putRole,
  deleteRole
}