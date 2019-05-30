
import axios from 'axios';
import { getUserToken, clearToken } from './auth';
import { Notification } from 'element-ui';
import { BASE_URL } from '../config/api';
import router from '../router'

const uploadUrl = [
  'upload'
];

// 创建axios实例
const service = axios.create({
  baseURL: BASE_URL, // api 的 base_url
  timeout: 61 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  },
  // withCredentials: true,
  // transformRequest: [function (data: any) {
  //   if (!(data instanceof FormData)) {
  //     data = qs.stringify(data)
  //   }
  //   return data;
  // }],
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (config.data && typeof config.data.pageNum !== 'undefined' && typeof config.data.pageRow === 'undefined') {
      config.data.pageRow = 10;
    }
    const token = getUserToken();
    if (token) config.headers['user-token'] = token;
    if (uploadUrl.filter(url => config.url && config.url.includes(url)).length > 0) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code为非000000是抛错
     */
    const res = response.data;
    // const token = response.headers['authorization'];
    // if (token) {
    //   setToken(token);
    // }
    if (res.code !== '0000') {
      Notification({
        title: '提示',
        message: res.msg,
        type: 'warning'
      })
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    if (error.toString().includes('Network Error')) {
      Notification({
        title: '提示',
        message: '网络错误，请稍后再试',
        type: 'warning'
      })
    } else if (error.toString().includes('timeout')) {
      Notification({
        title: '提示',
        message: '当前网络状况较差，请稍候再试',
        type: 'warning'
      })
    } else if (error.toString().includes('status code 401')) {
      Notification({
        title: '提示',
        message: '请先登录',
        type: 'warning'
      })
      clearToken();
      router.push(`/passport/login?directUrl=${window.location.hash.replace('#', '')}`)
    }
    return Promise.reject(error);
  },
);
export default service;
