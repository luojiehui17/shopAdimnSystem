<template>
    <div class="home">
        <el-container>
          <el-aside width="auto">
            <!-- logo -->
            <div class="logo"></div>

            <!-- 侧栏 -->
            <el-menu
              :router="true"
              mode="vertical"
              :collapse='isCollapse'
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              >
              <el-submenu v-for="level0 in menuList" :key="level0.id" :index="level0.id+''">
                <template slot="title">
                  <i :class="icons[level0.id]"></i>
                  <span>{{level0.authName}}</span>
                </template>
                <el-menu-item v-for="level1 in level0.children" :key="level1.path" :index="level1.path" >
                  {{level1.authName}}
                </el-menu-item>
              </el-submenu>
            </el-menu>

          </el-aside>
          <el-container>
          <el-header>
            <!-- 侧栏折叠icon -->
            <i class="myicon myicon-menu  toggle-btn" @click="isCollapse=!isCollapse"></i>
            <!-- 头部信息 -->
            <div class="system-title">狗东商城后台管理系统</div>
            <div class="welcome">欢迎您！{{username}}
              <el-button type="text" @click='logout'>　退出</el-button>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
</el-container>
    </div>
</template>

<script>
import {getMenu} from '@/api'
export default {
    data() { 
        return {
          isCollapse:false,
          username:localStorage.getItem('username'),
          // 菜单数据
          menuList:[],
          // 定义字体图集
          icons:[]
        }
    },
    methods:{
      logout(){
        // 退出登录，删除token信息
        localStorage.clear()
        // 跳转登录页
        this.$router.push('/login')
      }
    },
    created(){
      getMenu().then(res=>{
        // console.log(res)
        this.menuList = res.data
      })
      this.icons['125'] = "el-icon-service"
      this.icons['103'] = "el-icon-setting"
      this.icons['101'] = "el-icon-goods"
      this.icons['102'] = "el-icon-tickets"
      this.icons['145'] = "el-icon-document"
    }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color:#ebebeb ;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ebebeb;
  }
  .logo {
    height:60px;
    background: url(../assets/images/el2333.png);
    background-size: cover;
    background-color: #989898;
  }
  .toggle-btn {
    font-size: 30px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: black;
  }
  .welcome, {
    color: black;
  }
}

</style>