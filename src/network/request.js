import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://121.196.25.116:9080/index.php/',
=======
    baseURL: '/api/',
>>>>>>> 19337faf1464066a76335cf7e18a1e6309810ef8
    timeout: 5000
  })

  // 3.发送真正的网络请求  本身返回promise
  return instance(config)
}
