/* eslint-disable no-tabs */
<template>
  <div >
         <!-- 面包屑导航区域 -->

    <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    :row-class-name="tableRowClassName"
    border
    align="center"
    :current-page.sync="currentPage"
    style="width: 100%">
    <el-table-column
      prop="carId"
      label="ID"
      width="60">
    </el-table-column>
    <el-table-column
      prop="brandName"
      label="品牌"
      width="70">
    </el-table-column>
    <el-table-column
      prop="systemName"
      label="车系"
      width="80">
    </el-table-column>
    <el-table-column
      label="封面"
      width="100">
       <template slot-scope= "scope">
          <img :src="scope.row.carCover" alt= "" style= "width: 75px;height:75px">
        </template>
    </el-table-column>
    <el-table-column
      prop="carTitle"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="discountPrice"
      label="优惠价格"
      width="80">
    </el-table-column>
    <el-table-column
      prop="carKilometres"
      label="公里数"
      width="80">
    </el-table-column>
    <el-table-column
      prop="carYear"
      label="年份"
      width="110">
    </el-table-column>
    
    <el-table-column label="车辆基本参数" width="120">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-search" circle  @click="carBasicParam(scope.$index, scope.row)" click="carBasicParamVisible = true"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="发动机参数" width="120">
       

        <template slot-scope="scope">
             <el-button type="success" icon="el-icon-search" circle  @click="engineParam(scope.$index, scope.row)" click="engineParamVisible = true"></el-button>
        <!-- <el-button
          size="mini"
          @click="engineParam(scope.$index, scope.row)" click="engineParamVisible = true">点击查看</el-button> -->
      </template>
    </el-table-column>
    <el-table-column label="底盘及自动参数" width="120">
        <template slot-scope="scope">
            <el-button type="success" icon="el-icon-search" circle  @click="chassisBrake(scope.$index, scope.row)" click="chassisBrakeVisible = true"></el-button>
        <!-- <el-button
          size="mini"
          @click="chassisBrake(scope.$index, scope.row)" click="chassisBrakeVisible = true">点击查看</el-button> -->
      </template>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
          
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" click="dialogFormVisible = true">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)" click="dialogFormVisible = true"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle  @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 车辆基本参数对话框 -->
  <div>
    <el-dialog title="车辆基本参数" :visible.sync="carBasicParamVisible">
        <el-input type="hidden" v-model="carBasicParamForm.carId"></el-input>
        <table class="tableInfo" id="printTest" border="1">
          <thead></thead>
          <tbody>
            <tr>
              <td>厂商</td>
              <td>{{carBasicParamDatas.manufacturer}}</td>
            </tr>
            <tr>
              <td>级别</td>
              <td>{{carBasicParamDatas.level}}</td>
            </tr>
            <tr>
              <td>发动机</td>
              <td>{{carBasicParamDatas.engine}}</td>
            </tr>
            <tr>
              <td>变速箱</td>
              <td>{{carBasicParamDatas.transmissioCase}}</td>
            </tr>
            <tr>
              <td>车身结构</td>
              <td>{{carBasicParamDatas.carBodyStructure}}</td>
            </tr>
            <tr>
              <td>长/宽/高(mm)</td>
              <td>{{carBasicParamDatas.LWH}}</td>
            </tr>
            <tr>
              <td>轴距(mm)</td>
              <td>{{carBasicParamDatas.wheelbase}}</td>
            </tr>
            <tr>
              <td>行李箱容积(L)</td>
              <td>{{carBasicParamDatas.cargoVolume}}</td>
            </tr>
            <tr>
              <td>整备质量(kg) </td>
              <td>{{carBasicParamDatas.curbWeight}}</td>
            </tr>
          </tbody>
        </table>
    </el-dialog>
  </div>
  <!-- 发动机参数对话框 -->
  <div>
    <el-dialog title="发动机参数" :visible.sync="engineParamVisible">
        <el-input type="hidden" v-model="engineParamForm.carId"></el-input>
        <table class="tableInfo" border="1">
          <thead></thead>
          <tbody>
            <tr>
              <td>排量(L)</td>
              <td>{{engineParamDatas.displacement}}</td>
            </tr>
            <tr>
              <td>进气形式</td>
              <td>{{engineParamDatas.inlet}}</td>
            </tr>
            <tr>
              <td>气缸数</td>
              <td>{{engineParamDatas.cylinders}}</td>
            </tr>
            <tr>
              <td>最大马力(Ps)</td>
              <td>{{engineParamDatas.horsepower}}</td>
            </tr>
            <tr>
              <td>最大扭矩(N*m)</td>
              <td>{{engineParamDatas.torque}}</td>
            </tr>
            <tr>
              <td>燃料类型</td>
              <td>{{engineParamDatas.fuelType}}</td>
            </tr>
            <tr>
              <td>燃油标号</td>
              <td>{{engineParamDatas.fuelLabel}}</td>
            </tr>
            <tr>
              <td>供油方式</td>
              <td>{{engineParamDatas.oilSupply}}</td>
            </tr>
          </tbody>
        </table>
    </el-dialog>
  </div>
   <!-- 底盘及自动参数对话框 -->
  <div>
    <el-dialog title="底盘及自动参数" :visible.sync="chassisBrakeVisible">
        <el-input type="hidden" v-model="chassisBrakeForm.carId"></el-input>
        <table class="tableInfo" border="1">
          <thead></thead>
          <tbody>
            <tr>
              <td>驱动方式</td>
              <td>{{chassisBrakeDatas.drivingMode}}</td>
            </tr>
            <tr>
              <td>助力类型</td>
              <td>{{chassisBrakeDatas.assistance}}</td>
            </tr>
            <tr>
              <td>前悬挂类型</td>
              <td>{{chassisBrakeDatas.frontSuspension}}</td>
            </tr>
            <tr>
              <td>前制动类型</td>
              <td>{{chassisBrakeDatas.frontBrake}}</td>
            </tr>
            <tr>
              <td>后制动类型</td>
              <td>{{chassisBrakeDatas.rearBrake}}</td>
            </tr>
            <tr>
              <td>驱车制动类型</td>
              <td>{{chassisBrakeDatas.drivingBrakeType}}</td>
            </tr>
            <tr>
              <td>前轮胎规格</td>
              <td>{{chassisBrakeDatas.frontTires}}</td>
            </tr>
            <tr>
              <td>后轮胎规格</td>
              <td>{{chassisBrakeDatas.rearTires}}</td>
            </tr>
          </tbody>
        </table>
    </el-dialog>
  </div>
  <!-- 修改车辆信息对话框 -->
  <!-- <div>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-input type="hidden" v-model="ruleForm.user_id"></el-input>
            <el-form-item label="账号" prop="name">
                <el-input v-model="ruleForm.user_name"></el-input>
            </el-form-item>
                <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.user_age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.user_sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button> 
            </el-form-item>
        </el-form>
    </el-dialog>
  </div> -->
  <!-- 分页设置 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[3, 5, 10]"
    :page-size="pagesize"
    layout="sizes, total, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
</template>

<script>
import { request } from '../network/request'
export default {
  data () {
    return {
      carBasicParamVisible: false,// 车辆基本参数对话框
      engineParamVisible: false,// 发动机参数对话框
      chassisBrakeVisible: false,// 底盘及自动参数对话框
      dialogFormVisible: false,// 修改对话框
      stripe: true,
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      carBasicParamDatas:[],
      carBasicParamForm: {
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      carBasicParamrules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // age: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
      engineParamDatas:[],
      engineParamForm: {
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      engineParamrules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // age: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
      chassisBrakeDatas:[],
      chassisBrakeForm: {
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      chassisBrakerules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // age: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }

    }
  },
  methods: {
    // 车辆基本参数
    carBasicParam(index,row){
        this.carBasicParamVisible=true
        this.carBasicParamForm = Object.assign({}, row)
        // console.log(this.carBasicParamForm)
        request({
            url:'admin/Car/selCarBasicParam',
            method:'post',
            data:{
                carId:this.carBasicParamForm.carId
            }
        }).then((res)=>{
            // console.log(res.data.data[0])
            // console.log(typeof(res.data.data[0]))
            // let res.data.data=JSON.parse(res.data.data )
            this.carBasicParamDatas=res.data.data[0]
        })
    },
    // 发动机参数
    engineParam(index,row){
      this.engineParamVisible=true
      this.engineParamForm = Object.assign({}, row)
      request({
        url:'admin/Car/selEngineParam',
        method:'post',
        data:{
          carId:this.engineParamForm.carId
        }
      }).then((res)=>{
        console.log(res.data.data[0])
        this.engineParamDatas=res.data.data[0]
      })
    },
    // 底盘及自动参数
    chassisBrake(index,row){
      this.chassisBrakeVisible=true
      this.chassisBrakeForm = Object.assign({}, row)
      request({
        url:'admin/Car/selChassisBrake',
        method:'post',
        data:{
          carId:this.chassisBrakeForm.carId
        }
      }).then((res)=>{
        console.log(res.data.data[0])
        this.chassisBrakeDatas=res.data.data[0]
      })
      
    },
    tableRowClassName ({row, rowIndex}) {
    //   if ((rowIndex % 2)) {
    //     return 'warning-row'
    //   } else {
    //     return 'success-row'
    //   }
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      console.log(index, row)
      // 点击编辑
      this.dialogFormVisible = true // 显示弹框
      this.ruleForm = Object.assign({}, row) // editForm是Dialog弹框的data
    //   console.log(this.ruleForm)
    },
    submitForm (formName) {
      //   this.$refs[formName].validate((valid) => {
    //   this.$axios.post('Login/updateUser', {
    //     userId: this.ruleForm.user_id,
    //     userName: this.ruleForm.user_name,
    //     userAge: this.ruleForm.user_age,
    //     userSex: this.ruleForm.user_sex
    //   })
    //     .then((res) => {
    //     //   this.$set(this.data, index, row)
    //       this.$message({
    //         showClose: true,
    //         message: '修改成功',
    //         type: 'success'
    //       })
    //       this.getajaxdata()
    //     }).catch(function (error) {
    //       console.log(error)
    //     })
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getajaxdata () {
      request({
          url:'admin/selAllCarInfo',
          method:'post'
      })
        // eslint-disable-next-line no-return-assign
        .then((response) => {
          console.log(response.data)
          this.tableData = response.data.data
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
.tableInfo{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  font-size: 15px;
  color: rgb(10, 10, 10);
  /* border: 1px solid black;      */
}
.tableInfo td{
    width: 194px;
    height: 34px;
}
/* .el-table th{ */
    /* background-color: rgb(212, 211, 211);
    color:lightskyblue; */
/* } */
/* .el-table .warning-row {
    background: oldlace;
}
.el-table .success-row {
    background: #f0f9eb;
} */
</style>
