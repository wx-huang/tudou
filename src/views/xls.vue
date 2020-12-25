<template>
  <div>
    <el-upload
    class="upload-demo"
    action=""
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :file-list="fileListUpload"
    :limit="1"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
</el-upload>
  </div>
</template>
<script>
 import {
    request
  } from '../network/request.js'
export default {
  name: "",
  data () {
    return {
      fileListUpload:[]
    }
  },
  methods:{
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

  }
}
</script>
