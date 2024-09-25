export const getTime = ()=>{
  let msg=''
  // 利用内置构造函数Date()判断时间
  let hour=new Date().getHours()
  // console.log(hour);
  if(hour>=5 && hour <8){
    msg='早上'
  }else if(hour>=8 && hour <11){
    msg='上午'
  }else if(hour>=11 && hour <13){
    msg='中午'
  }else if(hour>=13 && hour <19){
    msg='下午'
  }else if(hour>=19 && hour <=23){
    msg='晚上'
  }else {
    msg='凌晨'
  }
  return msg
}