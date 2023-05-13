import dayjs from 'dayjs'
const timeFormat = (timeStr: string)=>{
  return dayjs(timeStr).format('YYYY-MM-DD HH:mm')
}

export{
  timeFormat
}