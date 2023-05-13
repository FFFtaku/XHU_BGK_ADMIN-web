type ParamsType = {
  [key: string]: any
}

const setRestfulStyleParams = (params: ParamsType)=>{
  let ret:string = ''
  for(const key in params){
    const currentParam = params[key]
    ret += `/${currentParam}`
  }
  return ret
}

const setFormDataParams = (params: ParamsType)=>{
  const _formData = new FormData()
  for(const key in params){
    _formData.append(key, params[key])
  }
  return _formData
}
export{
  setRestfulStyleParams,
  setFormDataParams
}