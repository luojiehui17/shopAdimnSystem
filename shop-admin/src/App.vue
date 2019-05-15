<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name:'App',
    // 添加侦听器
    watch:{
      "$route.path":function(){
        // console.log(this.$route)
        switch (this.$route.path) {
          case "/":
            // this.$message('欢迎')
            break;
          case "/login":
            // console.log("login")
            this.$message('请登录')
            break;
        }
      }
    }
}
</script>

<style>

</style>
