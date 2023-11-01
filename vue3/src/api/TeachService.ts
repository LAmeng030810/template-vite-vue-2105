// https://service.huhuiyu.top 后台api服务地址
const SERVICE_URL = 'https://service.huhuiyu.top'
const TOKRN_HEADER_KEY = 'token'

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

let TeachService = {
  send: (url: string, params: any, cb: Function, method: string) => {
    // 处理url
    let _url = SERVICE_URL + url
    let rdata = qs.stringify(params, { allowDots: true })
    // 如果是get请求，需要将promise拼接到地址栏
    if (method.toLocaleLowerCase() === 'get') {
      _url += '?' + rdata
      rdata = ''
    }
    // 发起请求
    let promise = ajax.request({
      url: _url,
      method: method,
      data: rdata,
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
    TeachService.send(url, params, cb, 'get')
  },
  post: (url: string, params: any, cb: Function) => {
    TeachService.send(url, params, cb, 'post')
  },
}

export { TeachService as default, TeachService as TeachService }
