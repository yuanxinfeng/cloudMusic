import axios from 'axios'
import router from '@/router'
import { Message, MessageBox, Notification } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://118.24.35.13:8588', // api 的 base_url
  timeout: 50000, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 1 * 1000
      })
      return Promise.reject(res.message)
    } else {
      return res
    }
  },
  (error) => {
    console.log(error)
    let code = 0
    let messages = ''
    try {
      code = error.response.data.status
      messages = error.response.data.message
    } catch (e) {
      if (error.toString().indexOf('timeout')) {
        Notification.error({
          title: '请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (roleAry.indexOf(messages) >= 0) {
      MessageBox.confirm(messages, '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === '403') {
      router.push({ path: '/401' })
    } else if (messages !== '401') {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 2500
        })
      }
      error = errorMsg
    }
    return Promise.reject(error)
  }
)
export default service
