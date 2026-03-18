import axios from 'axios'
import Taro from '@tarojs/taro'

const baseURL = (globalThis as any).__API_BASE_URL__ || 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL,
  timeout: 15000,
  adapter: async (config) => {
    const res = await Taro.request({
      url: `${config.baseURL}${config.url}`,
      method: (config.method || 'GET').toUpperCase() as any,
      data: config.data,
      header: config.headers as any
    })
    return {
      data: res.data,
      status: res.statusCode,
      statusText: String(res.statusCode),
      headers: res.header,
      config,
      request: res
    }
  }
})

