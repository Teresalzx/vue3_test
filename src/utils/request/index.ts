// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL:'http://127.0.0.1:8080/myApi',
  timeout:5000,
  headers:{
    "Content-Type": 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(config=>{
  
  if (localStorage.getItem('TOKEN')) {
      config.headers.token = localStorage.getItem('TOKEN')
  }
  return config
})

// 响应拦截器
service.interceptors.response.use((response)=>{
  return response.data
},(error)=>{
  //处理网络错误
  let msg = '';
  const status = error.response.status;
  switch (status) {
      case 401:
          msg = "token过期";
          break;
      case 403:
          msg = '无权访问';
          break;
      case 404:
          msg = "请求地址错误";
          break;
      case 500:
          msg = "服务器出现问题";
          break;
      default:
          msg = "无网络";

  }
  ElMessage({
      type: 'error',
      message: msg
  })
  return Promise.reject(error);
});
export default service