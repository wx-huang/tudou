<template>
  <div>
    <!-- 用户表 -->
    <el-table 
    fit 
    highlight-current-row 
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
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch v-model="scope.row.mg_state" @change="userStatusChanged(scope.row)">
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
    :total="tableData.length"
    class="Userpage">
    </el-pagination>
  </div>
</template>

<script>
  import {
    request
  } from '../../network/request.js';

  export default {
    data() {
      return {
        // 表格数据
        tableData: [],

        // 分页数据
        pagenum: 1,
        pagesize: 3
      }
    },
    methods: {
      // 请求用户user表
      userList() {
        request({
          url: 'admin/User/userList',
          method: 'post'
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.code == '2011') {
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
          if (res.data.code == '2013') {
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table__header-wrapper {
    line-height: 20px;
  }

  .el-table {
    max-width: 48%;
  }

  .el-table td, .el-table th {
    text-align: center !important;
  }

  .Userpage {
    width: 48%;
    margin-top: 15px;
  }

</style>
