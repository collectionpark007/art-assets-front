import request from '../utils/request'

const area = '/api/user'
/**
 * 个人信息
 */
export const info = (data: object) => {
  return request({
    url: `${area}/info`,
    method: 'post',
    data
  })
}
/**
 * 上传存证
 */
export const upload = (data: object) => {
  return request({
    url: `${area}/uploadDeposit`,
    method: 'post',
    data
  })
}
/**
 * 更新存证
 */
export const update = (data: object) => {
  return request({
    url: `${area}/updateDeposit`,
    method: 'post',
    data
  })
}
/**
 * 个人中心首页列表
 */
export const list = (data?: object) => {
  return request({
    url: `${area}/list`,
    method: 'post',
    data
  })
}
/**
 * 历史记录
 */
export const history = (data?: object) => {
  return request({
    url: `/api/front/index/history`,
    method: 'post',
    data
  })
}