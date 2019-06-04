import request from '../utils/request'

const area = '/api/user/token'
/**
 * token列表
 */
export const list = (data?: object) => {
  return request({
    url: `${area}/token_list`,
    method: 'post',
    data
  })
}
/**
 * token发行
 */
export const publish = (data?: object) => {
  return request({
    url: `${area}/deploy_token`,
    method: 'post',
    data
  })
}