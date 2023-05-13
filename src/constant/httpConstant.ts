const enum ResponseStatusEnum {
  SUCCESS = 10001,
  OPERATION_FAILURE = 20001,
  TOKEN_ERROR = 70001,
  ACCOUNT_ILLEGAL = 50001,
  API_PARAMETER_ERROR = 30001,
  IDENTITY_FAILURE = 40001,
  SERVER_ERROR = 60001,
}

const enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * axios支持的http请求方法
 *  | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';
 */
const enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export {
  ResponseStatusEnum,
  ContentTypeEnum,
  RequestMethodEnum
}