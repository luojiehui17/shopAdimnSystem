<template>
    <div class="login">
            <div class="container">
            <div class="avatar"><img src="../assets/images/preview.jpg" alt=""></div>
                <el-form ref="loginForm" :model="login" :rules="rules" label-width="80px">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="login.username" prefix-icon='el-icon-user'></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="login.password" prefix-icon='el-icon-key'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login-btn" @click='loginSubmit'>登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <router-link to='/register' class="fr">注册<i class="el-icon-right"></i></router-link>
                    </el-form-item>
                </el-form>    
            </div>    
    </div>
</template>

<script>
import { vertify } from "@/api"
// import axios from 'axios'
export default {
    data() { 
        return {
            login:{
                username:localStorage.getItem('username'),
                password:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 4, max: 8, message: '长度在4到8个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur' }
                ],
            }
        }
    },
    watch:{
        "login.username":function () {
            localStorage.setItem('username',this.login.username)
        }
    },
    methods:{
        loginSubmit() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    
                    // console.log(123,this.login)
                    // axios.post("http://127.0.0.1:8888/api/private/v1/login",this.login).then(res=>{
                    //     console.log(666,res)
                    // })
                    vertify(this.login).then(res=>{
                        // console.log(res)
                        if(res.meta.status==200){
                            this.$message({
                               message: '登陆成功！',
                               type: 'success'
                           });
                           localStorage.setItem('token',res.data.token)
                           localStorage.setItem('username',res.data.username)
                           this.$router.push('/')
                        }else{
                            this.$message({
                            message: res.meta.msg,
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: '账号或密码不能为空',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 0;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>