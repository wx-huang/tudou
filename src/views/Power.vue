<template>
  <div>
    <!-- 权限管理面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 权限表 -->
    <div class="power_box">
      <el-button type="success" plain @click="addRole">添加</el-button>
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
              <el-button type="info" @click="showEditDialog(scope.row.roleId)">修改</el-button>
              <el-button type="info" @click="removeRoleById(scope.row.roleId)">删除</el-button>
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

    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose">
      <!-- 对话框内容主题 -->
      <el-form 
      ref="addFormRef" 
      :model="addForm" 
      :rules="addFromRules"
      label-width="70px">
        <el-form-item label="ID" prop="roleId">
          <el-input v-model.number="addForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的 对话框 -->
    <el-dialog
      title="修改角色信息"
      :visible.sync="editDialogVisible"
      width="50%"
      >
      <!-- 表单 -->
      <el-form 
      :model="editFrom" 
      label-width="70px" 
      ref="editFromRef"
      >
        <el-form-item label="角色名">
          <el-input v-model="editFrom.roleName"></el-input>
        </el-form-item>
      </el-form>   
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

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
      },

      // 角色表的修改 弹出对话框
      showEditDialog(roleId) {
        // console.log(roleId);
        // 请求id对应的角色信息
        request({
          url:'admin/Power/roleDetail',
          method: 'post',
          data: {
            id: roleId
          }
        }).then(res => {
          console.log(res.data);
          this.editFrom = res.data[0];
        }).catch(err => {
          console.log(err);
        });
        this.editDialogVisible = true;
      },
      // 监听修改对话框 关闭事件
      editDialogClosed() {
        this.$refs.editFromRef.resetFields();
      },
      // 确定修改
      editRoleInfo() {
        request({
          url: 'admin/Power/editRole',
          method: 'post',
          data: {
            id:this.editFrom.roleId,
            name:this.editFrom.roleName
          } 
        }).then(res => {
          console.log(res.data);
          if(res.data.code == '1011') {
            // 修改成功执行三件事
            // 1关闭对话框
            this.editDialogVisible = false;
            // 2刷新数据列表
            this.roleList();
            // 3提示修改成功
            this.$message.success('修改成功！');
          } else {
            this.$message.success('修改失败！');
          }
        }).catch(err => {
          console.log(err);
        })
      },


      // 删除
      async removeRoleById(roleId) {
        // 弹窗  点击确认返回值confirm  点击取消返回值cancel
        const deleteRes = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(res => res);
        // 取消删除
        if(deleteRes !== 'confirm') {
          return this.$message.info('已取消删除');
        }
        // 确认删除
        request({
          url: 'admin/Power/deleteRole',
          method: 'post',
          data: {
            id: roleId
          }
        }).then(res => {
          // console.log(res.data);
          if(res.data.code == '1013') {
            this.roleList();
            return this.$message.success('删除成功！');
          } else {
            return this.$message.info('删除失败');
          }
        }).catch(err => {
          console.log(err);
        })        
      },


      // 监听用户添加对话框 显示
      addRole() {
        this.addDialogVisible = true
      },
      // 添加对话框取消事件
      addDialogClose() {
        this.$refs.addFormRef.resetFields();
      },
      // 确认添加
      addRoleSure() {
        // 预校验valid返回布尔值
        this.$refs.addFormRef.validate(valid => {
          if (!valid) return
          request({
            url: 'admin/Power/addRole',
            method: 'post',
            data: {
              id: this.addForm.roleId,
              name: this.addForm.roleName
            }
          }).then(res => {
            console.log(res.data);
            if(res.data.code == '1015') {
              this.addDialogVisible = false;
              this.roleList();
              this.$message.success('添加成功！');
            } else {
              this.$message.info('添加失败');
            }
          }).catch(err => {
            console.log(err);
          })
        })
      }
    },
    data() {
      return {        
        // 表格数据
        tableData: [],

        // 分页数据
        pagenum: 1, // 当前页数
        pagesize: 3, // 每页显示条目个数

        // 修改数据
        editDialogVisible: false, //控制修改对话框的显示
        editFrom: {}, //查询到的角色列表

        // 添加数据
        addDialogVisible: false, //控制添加对话框的显示
        addForm: { //添加用户的表单对象
          roleId: '',
          roleName: ''
        },
        addFromRules: { //添加表单的验证规则 
          roleId: [            
            {
              required: true,
              message: '请输入id',
              trigger: 'blur'
            },
            {
              required: true,
              message: '角色ID应为数字',
              trigger: 'blur',
              type: 'number'
            }
          ],
          roleName: [
            {
              required: true,
              message: '请输入角色名',
              trigger: 'blur'
            }
          ]
        },
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
