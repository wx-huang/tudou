<template>
  <div>
    <!-- 搜索区域 -->
    <el-row>
      <el-col :span='5'>
        <el-input placeholder="请输入内容搜索" class="userSel"  v-model="searchContent">
        </el-input>
      </el-col>
    </el-row>

    <!-- 用户表 -->
    <el-table 
    fit 
    highlight-current-row 
    :data="filterData2(tableData,searchContent).slice((pagenum-1)*pagesize,pagenum*pagesize)" 
    stripe 
    border>
      <!-- userId -->
      <el-table-column prop="userId" label="ID" width="100"></el-table-column>
      <!-- 用户电话 -->
      <el-table-column prop="phone" label="手机号码" width="200"></el-table-column>
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
    background
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
        pagesize: 3,

        // 搜索内容的数据
        searchContent:'',
      }
    },
    methods: {
      // 表格模糊搜索
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      // 注意： filter() 不会对空数组进行检测。
      // 注意： filter() 不会改变原始数组。
      // some() 方法用于检测数组中的元素是否满足指定条件;
      // some() 方法会依次执行数组的每个元素：
      // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
      // 如果没有满足条件的元素，则返回false。
      // 注意： some() 不会对空数组进行检测。
      // 注意： some() 不会改变原始数组。
      // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
      // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
      //var input = this.searchContent && this.searchContent.toLowerCase();
      filterData2(data,searchContent) {        
        var input = searchContent.toLowerCase()
        var items = data;
        var items1;
        if (input) {
          items1 = items.filter(function(item) {
            return Object.keys(item).some(function(key1) {
              return String(item[key1])
                .toLowerCase()
                .match(input);
            });
          });
        } else {
          items1 = items;
        }
        return items1;
      },
      // 请求用户user表
      userList() {
        request({
          url: 'admin/User/userList',
          method: 'post'
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.code == '2011') {
            console.log(res.data.data);
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
      },

      // tableDataF () {
      //   request({
      //     url: 'admin/User/userList',
      //     method: 'post'
      //   }).then(res => {
      //     // console.log(res.data.data);
      //     if (res.data.code == '2011') {
      //       console.log(res.data.data);

      //       const tableSelData = res.data.data;
      //       const searchTableInfo = this.searchTableInfo;
      //       console.log(searchTableInfo);
      //       if (searchTableInfo) {
      //         const tabelinfoList = tableSelData.filter(data => {
      //           console.log("success"+data);
      //           return Object.keys(data).some(key => {
      //             return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
      //           })
      //         })
      //         return tabelinfoList;
      //       }

      //       this.tableData = tabelinfoList;
      //     } else {
      //       this.$message.info('查询表数据失败');
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });       
      // }

    },
    computed: {
      // 根据计算属性模糊搜索
      // tableDataF () {
      //   const searchTableInfo = this.searchTableInfo
      //   if (searchTableInfo) {
      //     return this.tableData.filter(data => {
      //       console.log("success"+data)
      //       return Object.keys(data).some(key => {
      //         return String(data[key]).toLowerCase().indexOf(searchTableInfo) > -1
      //       })
      //     })
      //   }
      //   return this.tableData 
      // }
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
