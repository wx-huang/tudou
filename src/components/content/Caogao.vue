<template>
  <div>
    <!-- 用户管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- 卡片区域 -->
    <el-card class="box-card">      
      <el-row>
        <el-col :span='7'>
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>



    </el-card>
  <!-- 用户表区域 -->
  <div class="user_box">
    <!-- <el-button type="success" plain @click="addRole">添加</el-button> -->
    <!-- 用户表 -->
    <el-table 
      style="width: 100%" 
      :data="tableData.slice((pagenum-1)*pagesize,pagenum*pagesize)"
      stripe
      border>
        <!-- userId -->
        <el-table-column prop="userId" label="ID" width="100"></el-table-column>
        <!-- 用户电话 -->
        <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
        <!-- 登录时间 -->
        <el-table-column prop="ladingTime" label="登陆时间" width="200"></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" width="400">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch 
            v-model="scope.row.mg_state" 
            @change="userStatusChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>


</template>
<script>

import { request } from '../network/request.js';
import UserList from '../components/content/UserList'

export default {  
  data () {
    return {
      // 表格数据
      tableData: [],

      // 分页数据
      pagenum: 1,
      pagesize: 3
    }
  },
  methods:{
    // 请求用户user表
    userList() {
      request({
        url: 'admin/User/userList',
        method: 'post'
      }).then(res => {
        // console.log(res.data.data);
        if(res.data.code == '2011') {
          this.tableData = res.data.data;
        } else {
          this.$message.info('查询表数据失败');
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 监听表格 pagesize 改变时的事件
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 监听 页码值 改变时的事件
    handleCurrentChange(val) {
      this.pagenum = val;
    },

    // 监听switch开关改变
    userStatusChanged(userStatus) {
      console.log(userStatus);
      request({
        url: 'admin/User/userSwitch',
        method: 'post',
        data: {
          id: userStatus.userId,
          mg_state: userStatus.mg_state
        }
      }).then(res => {
        // console.log(res.data);
        if(res.data.code == '2013') {
          this.$message.success('更新用户状态成功');
        } else {
          userStatus.mg_state = !userStatus.mg_state;
          this.$message.info('更新用户状态失败');
        }
      }).catch(err => {
        userStatus.mg_state = !userStatus.mg_state;
        this.$message.info('更新用户状态失败');
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

  .el-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }


</style>
