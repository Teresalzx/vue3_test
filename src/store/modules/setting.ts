import {defineStore} from 'pinia'

let useSettingStore = defineStore('settingFold',{
  state:()=>{
    return {
      fold: false,
      refresh:false ,//用于控制刷新
      dark:false
    }
  }
})
export default useSettingStore