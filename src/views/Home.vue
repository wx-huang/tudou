<template>
  <div class="home1">
    <div class="home">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12" style="width: 100%;">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                <el-menu-item index="/index">
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/power">
                  <!-- 权限管理 -->
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>权限管理</span>
                  </template>
                </el-menu-item>
                <!-- 员工管理 -->
                <el-menu-item index="/staff">
                  <i class="el-icon-s-check"></i>
                  <span slot="title">员工管理</span>
                </el-menu-item>
                <!-- 用户管理 -->
                <el-menu-item index="/user">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <!-- 车辆信息管理 -->
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>车辆信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/carInfo">车辆管理</el-menu-item>
                    <el-menu-item index="/carUpload">车辆上传</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!-- 订单管理 -->
                <el-menu-item index="6">
                  <i class="el-icon-s-claim"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
                <!-- 客服 -->
                <el-menu-item index="/customer">
                  <i class="el-icon-phone-outline"></i>
                  <span slot="title">客服</span>
                </el-menu-item>
                <!-- 报表统计 -->
                <el-menu-item index="/report">
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
          <!-- <el-header>欢迎登录后台管理系统</el-header> -->

        <!-- 中 -->
        <el-main>
          <router-view />
        </el-main>

          

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
      },
      
    },
    mounted() {
      
    },
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

  .home1{
    height: 100%;
  }

  .home{
    height: 100%;
  }

  .el-container{
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
    line-height: 40px !important;
    height: 40px !important;
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

</style>
