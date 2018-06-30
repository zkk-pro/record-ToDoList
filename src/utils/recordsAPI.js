import axios from 'axios';

const api = process.env.REACT_APP_RECORDS || 
  'https://5b375ef36223c40014605845.mockapi.io';

// 获取列表
export const getList = () =>
  axios.get(`${api}/api/v1/records`)
// 提交事件
export const postList = (body) =>
  axios.post(`${api}/api/v1/records`, body)
// 更新数据
export const update = (id,date) =>
  axios.put(`${api}/api/v1/records/${id}`, date)
// 删除数据
export const remove = (id) =>
  axios.delete(`${api}/api/v1/records/${id}`)