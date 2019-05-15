<template>
    <div class="login">
            <div class="container">
            <div class="avatar"><img src="../assets/images/register.jpg" alt=""></div>
                <el-form ref="form" :model="register" label-width="80px">
                    <el-form-item label="账　　号">
                        <el-input v-model="register.username" prefix-icon='el-icon-user'></el-input>
                    </el-form-item>
                    <el-form-item label="密　　码">
                        <el-input v-model="register.password" prefix-icon='el-icon-key'></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="register.confirmPsw" prefix-icon='el-icon-key'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login-btn">注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <router-link to='/login'><i class="el-icon-back"></i>登录</router-link>
                    </el-form-item>
                </el-form>    
            </div>    
    </div>
</template>

<script>
export default {
    data() { 
        return {
            register:{
                username:localStorage.getItem('username'),
                password:'',
                confirmPsw:''
            }
        }
    },
    watch:{
        "register.username":function () {
            localStorage.setItem('username',this.register.username)
        }
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