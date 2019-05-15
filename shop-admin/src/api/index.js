// 接口函数库
// 导入axios
import axios from 'axios'
import { getMenus } from './index';

// 设置公共拦截器，为所有的请求设置token请求头
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    config.headers.Authorization = localStorage.getItem('token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 设置公共响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response)
  if(response.data.meta.msg=='无效token'){
    // 清空token
    localStorage.clear()
    // 跳转登录
    location='#/login'
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


// 设置公共基础路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 登录验证
export var vertify = function(data){
    return axios.post('/login',data).then(res=>{
        return res.data
    })
}
// 获取用户列表
export let getUserList = function (pagenum,pagesize,query="") {
  return axios.get('/users',{
    params:{
      pagenum,
      pagesize,
      query
    }
  }).then(res=>{
    return res.data
  })
}
// 获取菜单
export let getMenu = function(){
  return axios.get('/menus').then(res=>{
      return res.data
  })
}
// 新增用户
export let addUser = function(data){
  return axios.post('/users',data).then(res=>{
      return res.data
  })
}
// 删除用户
export let delUser = function (id) {
  return axios.delete(`/users/${id}`,).then(res=>{
    return res.data
  })
}
// 编辑用户
export let editUser = function (data) {
  return axios.put(`/users/${data.id}`,data).then(res=>{
    return res.data
  })
}
// 根据ID查询用户信息
export let getUserByID = function (id) {
  return axios.get(`/users/${id}`).then(res=>{
    return res.data
  })
}
// 获取角色列表信息
export let getRoleList = function () {
  return axios.get('/roles').then(res=>{
    return res.data
  })
}
// 角色更改
export let changRole = function (data) {
  return axios.put(`/users/${data.id}/role`,data).then(res=>{
    return res.data
  })
}
// 用户角色状态更改
export let userState = function (uid,type) {
  return axios.put(`/users/${uid}/state/${type}`).then(res=>{
    return res.data
  })
}
// 获取权限列表信息
export let getAuthList = function (type) {
  return axios.get(`/rights/${type}`).then(res=>{
    return res.data
  })
}
// 删除角色指定权限
export let delRoleAuth = function (roleId,rightId) {
  return axios.delete(`roles/${roleId}/rights/${rightId}`,).then(res=>{
    return res.data
  })
}
// 角色授权
export let roleAuth = function(roleId,rids){
  return axios.post(`/roles/${roleId}/rights`,{rids}).then(res=>{
      return res.data
  })
}
//删除角色
export let delRole = function (roleId) {
  return axios.delete(`roles/${roleId}`,).then(res=>{
    return res.data
  })
}
// 添加角色
export let addRole = function(data){
  return axios.post('/roles',data).then(res=>{
    return res.data
  })
}
// 编辑角色
export let editRole = function (data) {
  console.log(data)
  return axios.put(`/roles/${data.id}`,data).then(res=>{
    return res.data
  })
}
// ///////////////////商品管理////////////////////////////////
// 商品列表
export let getGoodsList = function (pagenum,pagesize,query='') {
  return axios.get('/goods',{
    params:{
      pagenum,
      pagesize,
      query
    }
  }).then(res=>{
    return res.data
  })
}
// 商品分类数据列表
export let getCategoriesList = function (type) {
  return axios.get('/categories',{
    params:{
      type
    }
  }).then(res=>{
    return res.data
  })
}
// 添加商品分类
export let addCategories = function(data){
  return axios.post('categories',data).then(res=>{
      return res.data
  })
}
// 添加商品
export let addGoods = function(data){
  return axios.post('/goods',data).then(res=>{
      return res.data
  })
}
// 删除商品
export let delGoods = function(id){
  return axios.delete(`/goods/${id}`,).then(res=>{
      return res.data
  })
}
//////////////////////// 订单管理/////////////////////////////////
// 订单数据列表
export let getOrdersList = function (pagenum,pagesize,query='') {
  return axios.get('/orders',{
    params:{
      pagenum,
      pagesize,
      query
    }
  }).then(res=>{
    return res.data
  })
}

//////////////////////////////数据报表//////////////////////////////////
export let getReports = function (typeid) {
  return axios.get(`/reports/type/${typeid}`).then(res=>{
    return res.data
  })
}