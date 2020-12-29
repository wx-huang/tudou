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
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <!-- id -->
        <el-table-column prop="date" label="ID" width="100"></el-table-column>
        <!-- 角色名 -->
        <el-table-column prop="name" label="角色名" width="100"></el-table-column>
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
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>


  </div>

</template>

<script>
  export default {
    methods: {
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }

</script>

<style>
  .power_box {
    width: 50%;
    height: 50%;
    /* border: 1px solid black; */
    /* position: absolute; */
    margin-top: 50px;
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
