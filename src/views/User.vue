<template>
  <div>
    <!-- 用户管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>    
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 用户列表组件 -->
      <Userlist></Userlist>
    </el-card>
  </div>
  


</template>
<script>

import Userlist from '../components/content/UserList'

export default {  
  data () {
    return {}
  },
  components: {
    Userlist
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  /* .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table__header-wrapper {
    line-height: 20px;
  } */

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