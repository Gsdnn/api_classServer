import request from './request'

export const login = (data) => {
  return request({
    url: '/auth',
    method: 'POST',
    data
  })
}
