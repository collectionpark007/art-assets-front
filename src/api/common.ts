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