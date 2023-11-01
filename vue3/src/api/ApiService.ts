// https://api.huhuiyu.top 后台api服务地址
const SERVICE_URL = 'https://api.huhuiyu.top'
const TOKRN_HEADER_KEY = 'Authorization'

import axios from 'axios'
import qs from 'qs'

// 创建axios实例
let ajax = axios.create()

let tokenDao = {
  save: (data: any) => {
    if (data && data.token) {
      localStorage.setItem(SERVICE_URL + TOKRN_HEADER_KEY, data.token)
    }
  },
  load: () => {
    let token = localStorage.getItem(SERVICE_URL + TOKRN_HEADER_KEY)
    return token ? token : ''
  },
  remove: () => {
    localStorage.removeItem(SERVICE_URL + TOKRN_HEADER_KEY)
  },
}

let ApiService = {
  send: (url: string, params: any, cb: Function, method: string) => {
    // 处理url
    let _url = SERVICE_URL + url
    // 如果是get请求，需要将promise拼接到地址栏
    if (method.toLocaleLowerCase() === 'get') {
      _url += '?' + qs.stringify(params, { allowDots: true })
    }
    // 发起请求
    let promise = ajax.request({
      url: _url,
      method: method,
      data: params,
      headers: {
        TOKEN_HEADER_KEY: tokenDao.load(),
      },
    })
    // 回调处理
    promise
      .then((resp) => {
        tokenDao.save(resp.data)
        cb(resp.data)
      })
      .catch((err) => {
        console.error('请求错误', err)
        cb({ success: false, message: '代码错了' })
      })
  },
  get: (url: string, params: any, cb: Function) => {
    ApiService.send(url, params, cb, 'get')
  },
  post: (url: string, params: any, cb: Function) => {
    ApiService.send(url, params, cb, 'post')
  },
  put: (url: string, params: any, cb: Function) => {
    ApiService.send(url, params, cb, 'put')
  },
  delete: (url: string, params: any, cb: Function) => {
    ApiService.send(url, params, cb, 'delete')
  },
  patch: (url: string, params: any, cb: Function) => {
    ApiService.send(url, params, cb, 'patch')
  },
}

export { ApiService as default, ApiService as ApiService }
