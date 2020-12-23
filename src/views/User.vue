<template>
  <div>
    <!-- 用户管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!-- 用户表 -->
  <div class="user_box">
    <!-- <el-button type="success" plain @click="addRole">添加</el-button> -->
    <!-- 权限表 -->
    <el-table 
      style="width: 100%" 
      :data="tableData">
        <!-- id -->
        <el-table-column prop="roleId" label="ID" width="100"></el-table-column>
        <!-- 角色名 -->
        <el-table-column prop="roleName" label="角色名" width="100"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" min-width="100">            
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.phone)">权限管理</el-button>
            <el-button type="info" @click="showEditDialog(scope.row.roleId)">修改</el-button>
            <el-button type="info" @click="removeRoleById(scope.row.roleId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


</template>
<script>

import { request } from '../network/request.js';

export default {  
  data () {
    return {
      tableData: [],
    }
  },
  methods:{
    // 请求用户user表
    userList() {
      request({
        url: 'admin/User/userList',
        method: 'post'
      }).then(res => {
        console.log(res.data);
        if(res.data.code == '2011') {
          this.tableData = res.data.data;
          this.$message.success('查询表数据成功');
        } else {
          this.$message.info('查询表数据失败');
        }
      }).catch(err => {
        console.log(err);
      });
    }
    
  },
  mounted() {
    this.userList();
  }
}
</script>
<style>
  .user_box {
    width: 50%;
    height: 50%;
    /* border: 1px solid black; */
    /* position: absolute; */
    margin-top: 50px;
    display: inline-block;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table__header-wrapper {
    line-height: 20px;
  }
</style>