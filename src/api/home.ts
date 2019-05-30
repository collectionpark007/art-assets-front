import request from '../utils/request'

const area = '/api/front'
/**
 * 
 * @param data pageNum pageRow
 */
export const list = (data: object) => {
  return request({
    url: `${area}/index/list`,
    method: 'post',
    data
  })
}
/**
 * 
 * @param data { id }
 */
export const detail = (data: object) => {
  return request({
    url: `${area}/index/detail`,
    method: 'post',
    data
  })
}