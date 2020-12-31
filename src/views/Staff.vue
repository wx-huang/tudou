<template>
  <div class="staffTable">
    <div class="addStaff">
      <el-button type="primary" @click="handleAdd()" click="addStaffFormVisible = true">添加用户</el-button>
    </div>
    <el-table
    :data="staffTable.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    class="staffInfo"
    border
    align="center"
    :current-page.sync="currentPage"
    style="width: 100%">
    <el-table-column
      prop="staffId"
      label="ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="staffAcc"
      label="账号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
      prop="staffRegTime"
      label="注册时间"
      width="240">
    </el-table-column>
    <el-table-column
      prop="staffStatus"
      label="是否启用"
      width="180">
      <template slot-scope="scope">
        <el-switch
        @change="changeStatus($event,scope.$index, scope.row)"
        v-model="scope.row.staffStatus"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="open" 
        inactive-value="close" >
        </el-switch>
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope" >
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)" click="dialogFormVisible = true"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle  @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[3, 5, 10]"
      :page-size="pagesize"
      background
      layout="sizes, total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <div>
      <el-dialog title="添加用户" :visible.sync="addStaffFormVisible">
          <el-form :model="addStaffForm" :rules="staffRules" ref="addStaffForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="staffAcc">
              <el-input v-model="addStaffForm.staffAcc"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="staffPwd">
              <el-input v-model="addStaffForm.staffPwd"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <!-- <el-input v-model="addStaffForm.role"></el-input> -->
              <el-select class="roleSelect" v-model="roleId" :filter-method="getRole" @change="getRoleId" placeholder="请选择角色">
                <el-option
                  v-for="item in role"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitAddStaffForm('addStaffForm')">添加</el-button>
                <el-button @click="resetForm('addStaffForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 修改用户信息 -->
    <div>
      <el-dialog title="修改用户信息" :visible.sync="updateStaffFormVisible">
          <el-form :model="updateStaffForm" :rules="updateStaffRules" ref="updateStaffForm" label-width="100px" class="demo-ruleForm">
            <el-input v-model="updateStaffForm.staffId" type="hidden"></el-input>
            <el-form-item label="账号" prop="staffAcc">
              <el-input v-model="updateStaffForm.staffAcc"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="staffPwd">
              <el-input v-model="updateStaffForm.staffPwd"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <!-- <el-input v-model="addStaffForm.role"></el-input> -->
              <el-select class="roleSelect" v-model="roleId" :filter-method="getRole" @change="getRoleId" placeholder="请选择角色">
                <el-option
                  v-for="item in role"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitUpdateStaffForm('updateStaffForm')">确定</el-button>
                <el-button @click="resetForm('updateStaffForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { request } from '../network/request'
export default {
  name: "",
  data () {
   return {
      // 分页
      stripe: true,
      staffTable: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      // 增加用户
      role: [],
      roleId: '',
      addStaffForm:{
        staffAcc:'',
        staffPwd:''
      },
      staffRules:{
        staffAcc:[
          {require:true,message:'请输入账号',trigger:'blur'},
          {min:4,max:8,message:'长度在4到8个字符',trigger:'blur'}
        ],
        staffPwd:[
          {require:true,message:'请输入密码',trigger:'blur'},
          {min:4,max:8,message:'长度在4到8个字符',trigger:'blur'}
        ]
      },
      addStaffFormVisible:false,
      // 修改用户信息
      updateStaffFormVisible:false,
      updateStaffForm:{
        staffId:'',
        staffAcc:'',
        staffPwd:''
      },
      updateStaffRules:{
        staffAcc:[
          {require:true,message:'请输入账号',trigger:'blur'},
          {min:4,max:8,message:'长度在4到8个字符',trigger:'blur'}
        ],
        staffPwd:[
          {require:true,message:'请输入密码',trigger:'blur'},
          {min:4,max:8,message:'长度在4到8个字符',trigger:'blur'}
        ]
      },

      
   }
  },
  methods:{
    // 添加员工
    getRole(){},
    handleAdd(){
      this.addStaffFormVisible=true
      request({
        url:'admin/Staff/selRole'
      }).then((res)=>{
        console.log(res)
        this.role=res.data.data.map(item=>{
          return { roleName:`${item.roleName}`,roleId:`${item.roleId}`}
        })
      })
    },
    getRoleId(value){
      this.roleId=value
      console.log(this.roleId)
    },
    submitAddStaffForm(addStaffForm){
      console.log(this.roleId)
      // console.log(addStaffForm)
      this.$refs[addStaffForm].validate((valid)=>{
        if(valid){
          request({
            url:'admin/Staff/addStaff',
            method:'post',
            data:{
              staffAcc:this.addStaffForm.staffAcc,
              staffPwd:this.addStaffForm.staffPwd,
              roleId:this.roleId
            }
          }).then(res=>{
            console.log(res.data.code)
            if(res.data.code==1003){
              this.$message.success('添加成功')
              setTimeout(()=>this.addStaffFormVisible=false,3000)
              this.roleId=''
            }else if(res.data.code=1004){
              this.$message.error('添加失败')
            }
          })
        }
      })
    },
    // 修改状态
    changeStatus(e,index,row){
      // console.log(row)
      request({
        url:'admin/Staff/updateStatus',
        method:'post',
        data:{
          staffId:row.staffId,
          staffStatus:row.staffStatus
        }
      }).then((res)=>{
        if(res.data.code==1007){
          // this.$message.success('')
          // setTimeout(()=>this.addStaffFormVisible=false,3000)
          
        }else if(res.data.code=1008){
          // this.$message.error('修改失败')
        }
      })
    },


    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 编辑
    handleEdit (index, row) {
      console.log(index, row)
      // 点击编辑
      this.updateStaffFormVisible = true // 显示弹框
      this.updateStaffForm = Object.assign({}, row) // editForm是Dialog弹框的data
      request({
        url:'admin/Staff/selRole'
      }).then((res)=>{
        console.log(res)
        this.role=res.data.data.map(item=>{
          return { roleName:`${item.roleName}`,roleId:`${item.roleId}`}
        })
      })
    },
    submitUpdateStaffForm(updateStaffForm){
      // this.getRoleId(value)
      console.log(this.roleId)
      this.$refs[updateStaffForm].validate((valid)=>{
        if(valid){
          request({
            url:'admin/Staff/updateStaff',
            method:'post',
            data:{
              staffId:this.updateStaffForm.staffId,
              staffAcc:this.updateStaffForm.staffAcc,
              staffPwd:this.updateStaffForm.staffPwd,
              roleId:this.roleId
            }
          }).then((res)=>{
                console.log(res.data)
                if(res.data.code==1009){
                  this.$message.success('修改成功')
                  setTimeout(()=>this.updateStaffFormVisible=false,3000)
                  this.roleId=''
                  this.getajaxdata()
                }else if(res.data.code=1010){
                  this.$message.error('修改失败')
                }
          }).catch((err)=>{
            console.log(err)
          })
        }
      })
    },


    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm(
        '是否删除该员工?',
        {
          confirmButtonText:'确定',
          canceButtonText:'取消',
          type:'warning'
        }
        ).then(()=>{
          console.log(row.staffId)
          request({
            url:'admin/Staff/delStaff',
            method:'post',
            data:{staffId:row.staffId}
          }).then((res)=>{
            if(res.data.code==1011){
              this.$message.success('删除成功')
              this.getajaxdata()
            }else{
              this.$message.error('删除失败')
            }
          })
        }).catch(res=>res)
      
    },
    getajaxdata () {
      request({
          url:'admin/staff/selStaff',
          method:'post'
      }).then((response) => {
          console.log(response.data)
          this.staffTable = response.data.data
          this.total = response.data.count
        })
    }
  },
  mounted () {
    this.getajaxdata()
  }
}
</script>
<style>
.staffTable{
  width:878px;
  margin: 0 auto;
}
.el-table td, .el-table th{
  text-align: center;
  line-height: 30px;
  /* color:#666; */
}
.el-table thead {
    color: black;
    font-weight: 300;
    background-color: lightgray;
}
.el-dialog__header {
    padding: 20px 20px 10px;
    height: 20px;
    line-height: 20px;
}
.el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    line-height: 15px;
}
.staffTable{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  font-size: 15px;
  color: rgb(10, 10, 10);
  /* border: 1px solid black;      */
}
.staffTable td{
    width: 194px;
    height: 34px;
}
.staffInfo{
  width:100%;
}
.addStaff{
  line-height: 0;
  float: right;
}
.roleSelect{
  width:620px;
}
</style>