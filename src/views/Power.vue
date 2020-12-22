<template>
  <div>
    <!-- 权限管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限表 -->
    <div class="power_box">
      <!-- 权限表 -->
      <el-table 
        style="width: 100%" 
        :data="tableData.slice((pagenum-1)*pagesize,pagenum*pagesize)">
          <!-- id -->
          <el-table-column prop="roleId" label="ID" width="100"></el-table-column>
          <!-- 角色名 -->
          <el-table-column prop="roleName" label="角色名" width="100"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="checkDetail(scope.row.phone)">权限管理</el-button>
              <el-button type="info" @click="modifyUser(scope.row.phone)">修改</el-button>
              <el-button type="info" @click="deleteUser(scope.row.phone)">删除</el-button>
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
        :total="tableData.length" 
        layout="total, sizes, prev, pager, next, jumper"   
      ></el-pagination>

    </div>
  </div>

</template>

<script>

  import { request } from '../network/request.js';

  export default {
    methods: {
      // 请求权限表
      roleList() {
        request({
          url: 'admin/Power/roleList',
          method: 'post'        
        }).then(res => {
          // console.log(res.data);
          this.tableData = res.data;
          // this.total = (res.data).length;
        }).catch(err => {
          console.log(err);
        })
      },

      // 分页 的事件
      // 当每页条数改变时 val是页码
      handleSizeChange(val) {
        this.pagesize = val;
        // console.log(`每页 ${val} 条`);
      },
      // 选择下一页或者跳到第几页
      handleCurrentChange(val) {
        this.pagenum = val;
        // console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {        
        // 表格数据
        tableData: [],

        // 分页数据
        pagenum: 1, // 当前页数
        pagesize: 3, // 每页显示条目个数
      };
    },
    mounted() {
      // 挂载的时候，请求权限表
      this.roleList();
    },
  }

</script>

<style>
  .power_box {
    width: 50%;
    height: 50%;
    /* border: 1px solid black; */
    /* position: absolute; */
    margin-top: 50px;
    display: inline-block;
  }

  .disPower_box {
    width: 500px;
    height: 399px;
    border: 1px solid black;
    display: inline-block;
    margin: 1px 0 0 48px;
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
