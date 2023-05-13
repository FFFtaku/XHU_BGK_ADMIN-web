// const checkPasswordLegal = (password: string)=>{
//   const pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
//   return pattern.test(password)
// }

const checkTelLegal = (tel: string)=>{
  const pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
  return pattern.test(tel)
}

const checkEmailLegal = (email: string)=>{
  const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return pattern.test(email)
}

export{
  checkTelLegal,
  checkEmailLegal
}