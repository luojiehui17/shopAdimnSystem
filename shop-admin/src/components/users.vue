<template>
    <div class="user">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select search-input" @keydown.enter.native="initList">
            <!-- 绑定查询方法 -->
            <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
        </el-input>
        <el-button type="primary" @click="addDialog = true">新增用户</el-button>
        <!-- 用户表格 -->
        <el-table
            :border='true'
            :data="users"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="username"
                label="账号"
                >
            </el-table-column>
            <el-table-column
                prop="role_name"
                label="角色"
                >
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机"
                >
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间"
                >
                <template slot-scope="user">
                    {{user.row.create_time | timeFormat}}
                </template>
            </el-table-column>
            <el-table-column
                prop="mg_state"
                label="启用"
                >
                <template slot-scope="user">
                    <el-switch
                        @change="stateChange(user)"
                        v-model="user.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="220">
                <template slot-scope="user">
                    <el-button type="primary" icon="el-icon-edit" @click="edit(user)"></el-button>
                    <el-button type="primary" icon="el-icon-setting" @click="changeRole(user)"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="del(user)"></el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination
            class="page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

        <!-- 新增用户弹窗 -->
        <el-dialog title="新增用户" :visible.sync="addDialog" width="30%">
            <el-form :model="addForm">
                <el-form-item label="账号" label-width="40px">
                <el-input v-model="addForm.username" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="40px">
                <el-input v-model="addForm.password" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" label-width="40px">
                <el-input v-model="addForm.mobile" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="40px">
                <el-input v-model="addForm.email" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑用户弹窗 -->
        <el-dialog title="编辑用户" :visible.sync="editDialog" width="30%">
            <el-form :model="editForm">
                <el-form-item label="账号" label-width="40px">
                <el-input v-model="editForm.username" :disabled="true" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" label-width="40px">
                <el-input v-model="editForm.mobile" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="40px">
                <el-input v-model="editForm.email" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 角色更改弹窗 -->
        <el-dialog title="用户权限" :visible.sync="roleDialog" width="30%">
            <el-form :model="roleForm">
                <el-form-item label="账号" label-width="40px">
                    <el-input v-model="roleForm.username" :disabled="true" autoComplete="off"></el-input>
                </el-form-item>
                <!-- 下拉菜单 -->
                <el-form-item label="角色" label-width="40px">
                    <el-select v-model="roleForm.rid" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :disabled="item.id==0||item.id==-1"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialog = false">取 消</el-button>
                <el-button type="primary" @click="roleSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getUserList,addUser,delUser,editUser,getUserByID,getRoleList,changRole,userState} from '@/api'
import { constants } from 'fs';
import { connect } from 'tls';
export default {
    data() { 
        return {
            // 搜索关键字
            query:'',
            // 用户信息
            users:[],
            // 分页数据
            pagenum:1,
            pagesize:10,
            total:0,
            // 新增用户信息
            addForm:{
                username:'',
                password:'',
                mobile:'',
                email:''
            },
            addDialog:false,

            // 变量控制开关
            editDialog:false,
            // 更改数据
            editForm:{
                username:'',
                id:'',
                mobile:'',
                email:''
            },
            // 更改角色权限数据
            roleDialog:false,
            roleForm:{
                username:'',
                id:'',
                rid:''
            },
            // 角色列表
            roleList:[],


        }
    },
    methods:{
        // 封装查询功能
        initList(){
            getUserList(this.pagenum,this.pagesize,this.query).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    // 响应成功把信息存储起来
                    this.users = res.data.users
                    // 存储分页信息与条数信息
                    this.total = res.data.total
                    this.pagenum = res.data.pagenum
                }
            })
        },
        // 每页显示数发生改变
        handleSizeChange(size){
            // console.log(size)
            this.pagesize = size
            this.initList()
        },
        // 当分页页码改变时
        handleCurrentChange(page){
            // console.log(page)
            this.pagenum = page
            this.initList()
        },
        // 新增用户
        addSubmit(){
            if(this.addForm.username&&this.addForm.password){
                addUser(this.addForm).then(res=>{
                    // console.log(res)
                    // 判断响应
                    if(res.meta.status==201){
                        // 成功提示
                        this.$message({
                            message: res.meta.msg,
                            type: 'success'
                        });
                        // 关闭窗口
                        this.addDialog = false
                        // 清空窗口数据
                        this.addForm = {
                            username:'',
                            password:'',
                            mobile:'',
                            email:''
                        }
                        // 修改关键是为新增用户名
                        this.query = res.data.username
                        this.initList()
                    }else{
                        // 失败提示
                        this.$message.error(res.meta.msg)

                    }
                })
            }
        },
        // 删除
        del(id){
            // console.log(id)
            delUser(id.row.id).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    // 成功提示
                    this.$message({
                        type:"success",
                        message:res.meta.msg

                    })
                }else{
                    // 失败提示
                    this.error(res.meta.msg)
                }
                // 刷新
                this.initList()
            })
        },
        // 更改提交
        editSubmit(){
            editUser(this.editForm).then(res=>{
                // console.log(res)
                if(res.meta.status == 200){
                    // 成功提示
                    this.$message({
                        type:"success",
                        message:res.meta.msg

                    })
                    this.editDialog = false
                }else{
                    // 失败提示
                    this.error(res.meta.msg)
                }
                // 刷新
                this.initList()
            })
        },
        // 更改提交前准备
        edit(user){
            this.editDialog = true;
            getUserByID(user.row.id).then(res=>{
                this.editForm = res.data
            })

        },
        // 角色更改提交
        roleSubmit(){
            changRole(this.roleForm).then(res=>{
                // console.log(res)
                if(res.meta.status ==200){
                    // 成功提示信息
                    this.$message({
                        type:'success',
                        message:res.meta.msg
                    })
                    // 刷新
                    this.initList()
                    this.roleDialog = false
                }else{
                    // 失败提示信息
                    this.$message.error(res.meta.msg)
                }
            })
        },
        // 权限更改准备工作
        changeRole(user){
            this.roleDialog = true
            getRoleList().then(res=>{
                this.roleList = res.data
                // 额外添加不可修改的角色id 0 -1
                this.roleList.push({id:0,roleName:"超级管理员"})
                this.roleList.push({id:-1,roleName:"空闲人员"})
            })
            getUserByID(user.row.id).then(res=>{
                // console.log(res)
                this.roleForm = res.data
            })
        },
        // 状态改变
        stateChange(user){
            // console.log(user.row.mg_state)
            userState(user.row.id,user.row.mg_state).then(res=>{
                // console.log(res)
                if(res.meta.status != 200){
                    user.row.mg_state = !user.row.mg_state
                }
            })
        }

        
    },
    created(){
        this.initList()
    },
    // 时间戳过滤器
    filters:{
        timeFormat(time){
            let date = new Date(time*1000);
            let y = date.getFullYear();
            let m = (date.getMonth()+1).toString().padStart(2,0);
            let d = date.getDate().toString().padStart(2,0)
            return `${y}/${m}/${d}`

        }
    }
}
</script>

<style lang="scss" scoped>
.user {
  .margin-20 {
    margin: 20px 0;
  }
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>