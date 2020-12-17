import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: '/api/',
    timeout: 5000
  })

  // 3.发送真正的网络请求  本身返回promise
  return instance(config)
}
