import request from '../utils/request'

/**
 * 注册
 */
export const reg = (data: object) => {
  return request({
    url: `/api/common/user/registered`,
    method: 'post',
    data
  })
}
/**
 * 登录
 */
export const login = (data: object) => {
  return request({
    url: `/api/login/auth`,
    method: 'post',
    data
  })
}
/**
 * 登出
 */
export const logout = () => {
  return request({
    url: `/api/login/logout`,
    method: 'post',
  })
}
/**
 * 获取短信验证码
 */
export const getSms = (data: object) => {
  return request({
    url: `/api/common/user/send_register_captcha`,
    method: 'post',
    data
  })
}
/**
 * 获取public_key
 */
export const getKey = () => {
  return request({
    url: `/api/common/public_key`,
    method: 'get',
  })
}

export const uploadImage = (file) => {
  const data = new FormData();
  data.append('file', file);
  return request({
    url: `/api/common/upload_image`,
    method: 'post',
    data
  })
}