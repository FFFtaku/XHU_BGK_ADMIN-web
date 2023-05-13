import http from './request/http'

type GetCollegeList = {
  collegeId?: number,
  collegeName?: string
} | undefined
function getCollegeList(argu: GetCollegeList) {
  return http.get('/college/list', argu)
}

type PostCollege = {
  collegeName: string
}
function postCollege(argu: PostCollege) {
  return http.post('/college', argu)
}

type PutCollege = {
  collegeId: number,
  collegeName: string
}
function putCollege(argu: PutCollege) {
  return http.put('/college', argu)
}

type DeleteCollege = {
  ids: Array<number>
}
function deleteCollege(argu: DeleteCollege) {
  return http.delete('/college', argu)
}

export {
  getCollegeList,
  postCollege,
  putCollege,
  deleteCollege
}