<template>
  <div style="width: 500px;margin: 0 auto;">
      <el-form :model="carForm" :rules="rules" ref="carForm" label-width="100px" class="demo-ruleForm">
        
        <el-form-item label="品牌" prop="brandName">
          <el-select
            v-model="value"
            clearable
            filterable
            remote
            reserve-keyword
            @change="brandNameChange"
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :filter-method="getBrandName"
            :loading="loading">
            <el-option
              v-for="item in brandNames"
              :key="item.brandId"
              :label="item.brandName"
              :value="item.brandId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="车系" prop="systemName">
          <el-select v-model="systemId" :filter-method="getSystemName" placeholder="请选择">
            <el-option
              v-for="item in systemNames"
              :key="item.systemId"
              :label="item.systemName"
              :value="item.systemId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车主电话" prop="phone">
          <el-input v-model="carForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="原价格" prop="oldPrice">
          <el-input v-model="carForm.oldPrice"></el-input>
        </el-form-item>
        <el-form-item label="优惠价格" prop="discountPrice">
          <el-input v-model="carForm.discountPrice"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="carCover">
          <el-input type="file" v-model="carForm.carCover"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="carTitle">
          <el-input v-model="carForm.carTitle"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="carForm.city"></el-input>
        </el-form-item>
        <el-form-item label="公里数" prop="carKilometres">
          <el-input v-model="carForm.carKilometres"></el-input>
        </el-form-item>
        <el-form-item label="车辆基本参数" prop="carBasicParam">
          <el-upload class="upload-demo" action="" :on-change="handleChange" :on-exceed="handleExceed" :on-remove="handleRemove" :file-list="fileListUpload" :limit="1" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文 件</div>
          </el-upload>
        </el-form-item>
         <el-form-item label="车辆基本参数" prop="engineParam">
          <el-upload class="upload-demo" action="" :on-change="handleChange" :on-exceed="handleExceed" :on-remove="handleRemove" :file-list="fileListUpload" :limit="1" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文 件</div>
          </el-upload>
        </el-form-item>
         <el-form-item label="车辆基本参数" prop="chassisBrake">
          <el-upload class="upload-demo" action="" :on-change="handleChange" :on-exceed="handleExceed" :on-remove="handleRemove" :file-list="fileListUpload" :limit="1" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文 件</div>
          </el-upload>
        </el-form-item>





        <el-form-item>
            <el-button type="primary" @click="submitForm('carForm')">立即创建</el-button>
            <el-button @click="resetForm('carForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from '../network/request';
  export default {
    data() {
      return {
        carForm: {
          brandName: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        brandNames: [],
        value: [],
        list: [],
        loading: false,
        states: [],
        systemNames: [],
        systemId: '',
        fileListUpload:[]//表格



      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getBrandName(){
        request({
          url:'admin/Car/selBrandNames',
          method:'post'
        }).then((res)=>{
          console.log(res.data.data)
          this.states=res.data.data
          this.list = this.states.map(item => {
            return { brandName: `${item.brandName}`,brandId: `${item.brandId}`}
          });
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.brandNames = this.list.filter(item => {
              // return item.label.toLowerCase()
              //   .indexOf(query.toLowerCase()) > -1;
              return item.brandName.indexOf(query)>-1
            });
          }, 200);
        } else {
          this.brandNames = [];
        }
      },
      brandNameChange(event,item){
        console.log(event)
        // console.log(item)
        request({
          url:'admin/Car/selSystemName',
          method:'post',
          data:{
            brandId:event
          }
        }).then((res)=>{
          console.log(res)
           this.systemNames = res.data.data.map(item => {
            return { systemName: `${item.systemName}`,systemId: `${item.systemId}`}
          });
        })
      },
      getSystemName(){},
      handleChange(file, fileList){
      this.fileTemp = file.raw
      console.log(this.fileTemp)
       let extension =  this.fileTemp.name.substring(file.name.lastIndexOf('.')+1)
      if(this.fileTemp){
          if(extension=='xlsx'){
              this.importfxx(this.fileTemp)
          } else {
              this.$message({
                  type:'warning',
                  message:'附件格式错误，请删除后重新上传！'
              })
          }
      } else {
          this.$message({
              type:'warning',
              message:'请上传附件！'
          })
      }

      },
      handleExceed(){},

      handleRemove(file,fileList){
        this.fileTemp = null
      },
      importfxx(obj) {
        console.log(obj)
        let _this = this;
        // 通过DOM取文件数据
        this.file = obj
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
            var binary = "";
            var rABS = false; //是否将文件读取为二进制字符串
            var pt = this;
            var wb; //读取完成的数据
            var outdata;
            var reader = new FileReader();
            reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if(rABS) {
                wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                    type: 'base64'
                });
            } else {
                wb = XLSX.read(binary, {
                    type: 'binary'
                });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                this.da = [...outdata]
                let arr = []
                this.da.map(v => {
                    let obj = {}
                    // obj.code = v['id']
                    obj.staffAcc = v['name']
                    console.log(v['name'])
                    arr.push(obj)
                })
                console.log(arr)
                // return arr
                request({
                url: 'admin/carInfo',
                method: 'post',
                data:{carInfo:arr}
              }).then(res => {//响应成功判断
                      console.log(res)    
              }).catch(err => {
              
              })
            }
            // console.log(outdata)
            reader.readAsArrayBuffer(f);
            // console.log(outdata)
        }
        
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
      },
      
        // if (query !== '') {
        //   this.loading = true;
        //   setTimeout(() => {
        //     this.loading = false;
        //     this.options = this.list.filter(item => {
        //       return item.label.toLowerCase()
        //         .indexOf(query.toLowerCase()) > -1;
        //     });
        //   }, 200);
        // } else {
        //   this.options = [];
        // }
      
    },
    mounted(){
      this.getBrandName()
      // this.list = this.states.map(item => {
      //   // return { value: `value:${item}`, label: `label:${item}` }
      //   console.log(item)
      // });
    }
   
  }
</script>
<style>
.el-select {
    width: 400px;
}
</style>