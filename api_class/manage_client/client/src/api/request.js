import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { diffTokenTime } from '@/utils/auth'
// import store from '@/store'
const service = axios.create({
    baseURL: import.meta.env.VUE_APP_BASE_API || '/api',
    timeout: 5000
})
service.interceptors.request.use(
    (config) => {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    (error) => {
      return Promise.reject(new Error(error))
    }
  )
  service.interceptors.response.use(
    (response) => {
      const meta = response.data
      if (meta.status !=400) {
        // console.log(meta)
        return meta
      } else {
        console.log(meta)
        ElMessage.error(meta.err)
        return Promise.reject(new Error(meta.err))
      }
    },
    (error) => {
      console.log(error.response)
      error.response && ElMessage.error(error.response.data)
      return Promise.reject(new Error(error.response.data))
    }
  )
  export default service
