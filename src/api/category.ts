import request from '@/utils/request'

const area = '/api/category'

/**
 * 所有分类
 */
export const list = (data?: object) => {
  return request({
    url: `${area}/list`,
    method: 'post',
    data
  })
}

/**
 * 分类详情
 */
export const detail = (data?: object) => {
  return request({
    url: `${area}/detail`,
    method: 'post',
    data
  })
}

/**
 * 属性列表
 */
export const findBySpecificationId = (data?: object) => {
  return request({
    url: `/api/specification/findBySpecificationId`,
    method: 'post',
    data
  })
}