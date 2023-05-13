import http from './request/http'

type GetMenuList = undefined
function getMenuList(argu: GetMenuList) {
  return http.get('/menu/list', argu)
}

type PostRole = {
  roleName: string,
  roleKey: string,
  menuIds: Array<number>
}
function postRole(argu: PostRole) {
  return http.post('/role', argu)
}

type PutRole = undefined
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
  getMenuList
}