<template>
<<<<<<< HEAD
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12" style="width:100%">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
=======
  <div>
    <div class="home">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12" style="width: 100%;">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
>>>>>>> 19337faf1464066a76335cf7e18a1e6309810ef8
                <el-menu-item index="2">
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                  <!-- 权限管理 -->
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限管理</span>
                  </template>
                  <!-- 1.1 -->
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <!-- 员工管理 -->
                <el-menu-item index="/power">
                  <i class="el-icon-s-check"></i>
                  <span slot="title">员工管理</span>
                </el-menu-item>
                <!-- 用户管理 -->
                <el-menu-item index="3">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <!-- 车辆信息管理 -->
                <el-menu-item index="4">
                  <i class="el-icon-goods"></i>
                  <span slot="title">车辆信息管理</span>
                </el-menu-item>
                <!-- 商品管理 -->
                <el-menu-item index="5">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品管理</span>
                </el-menu-item>
                <!-- 订单管理 -->
                <el-menu-item index="6">
                  <i class="el-icon-s-claim"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
                <!-- 客服 -->
                <el-menu-item index="7">
                  <i class="el-icon-phone-outline"></i>
                  <span slot="title">客服</span>
                </el-menu-item>
                <!-- 报表统计 -->
                <el-menu-item index="8">
                  <i class="el-icon-s-data"></i>
                  <span slot="title">报表统计</span>
                </el-menu-item>
                <!-- 投诉管理 -->
                <el-menu-item index="9">
                  <i class="el-icon-phone"></i>
                  <span slot="title">投诉管理</span>
                </el-menu-item>
                <!-- 广告管理 -->
                <el-menu-item index="10">
                  <i class="el-icon-s-promotion"></i>
                  <span slot="title">广告管理</span>
                </el-menu-item>
                <!-- 操作日志 -->
                <el-menu-item index="11">
                  <i class="el-icon-s-flag"></i>
                  <span slot="title">操作日志</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <!-- 左边上中下 -->
        <el-container>

          <!-- 上 -->
          <el-header>欢迎登录后台管理系统<button @click="functionname">123</button></el-header>

<<<<<<< HEAD
        <!-- 中 -->
        <el-main>
          <router-view />
        </el-main>
       
=======
          <!-- 中 -->
          <el-main>
            <router-view />
          </el-main>
>>>>>>> 19337faf1464066a76335cf7e18a1e6309810ef8

          <!-- 下 -->
          <el-footer>版权2020.12</el-footer>

        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  import {
    request
  } from '../network/request.js'

  export default {
    name: 'Home',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      functionname() {
        request({
          methods: 'post',
          url: 'admin/Home/ajaxtest'
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }

</script>

<style>
  html {
    height: 100%;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .home {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 44px;
    line-height: 44px;
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body>.el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-container {
    height: 100%;
  }

</style>
