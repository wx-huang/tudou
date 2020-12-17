<template>
  <div id="app">
    <!-- <router-link to="/home/100" tag="button" replace>首页</router-link>
    <router-link to="/about/200" tag="button" replace>关于</router-link>
    <router-link to="/me" tag="button" replace>我的账号</router-link> -->
    <!-- 占位置 -->
    <router-view/>
  </div>
</template>

<script>  

// import Home from './views/Home'

export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>