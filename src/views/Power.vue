<template>
  <div>
    <!-- 权限管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">      
      <!-- 权限表 -->
      <PowerList></PowerList>
    </el-card>

  </div>

</template>

<script>

import PowerList from '../components/content/PowerList'

  export default {
    methods: {},
    data() {
      return {}
    },
    mounted() {},
    components: {
      PowerList
    }
  }

</script>

<style>
  .el-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }

  .el-main {
    line-height: 0px !important;
  }

  .el-row {
    height: 58px !important;
  }

</style>
