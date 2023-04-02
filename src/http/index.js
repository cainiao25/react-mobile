import axios from 'axios';
import { Spin } from 'antd'


const services = axios.create({
  baseURL: 'https://srv.hotkidceo.com/appapi',
  timeout:3000
});

// 请求拦截 => 请求开始之前,触发的一个回调函数.
services.interceptors.request.use((config) => {
  // 这里的config是请求配置.
  console.log('config', config);
  // 必须return config, 否则请求默认无法开始.
  
  return config
}, (err) => {
  return Promise.reject(err)
  
});

// 响应拦截 => 请求完成之前, 触发一个回调函数.
services.interceptors.response.use((response) => {
  // 服务器返回的数据
  // console.log('response', response);
  // 一定要return response, 否则then里面拿不到数据
  return response
}, (err) => {
  return Promise.reject(err);
});

export { services }