<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="staff_acc">
        <el-input type="text" placeholder="请输入账号" v-model="form.staff_acc" />
      </el-form-item>
      <el-form-item label="密码" prop="staff_pwd">
        <el-input type="password" placeholder="请输入密码" v-model="form.staff_pwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <!-- <el-button type="primary" v-on:click="onSubmit('loginForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <span>123</span>
    <span>456</span>
    <span>789</span>

  </div>
</template>
<script>
  import {
    request
  } from '../network/request.js'

  export default {
    name: 'Content',
    data() {
      return {
        form: {
          staff_acc: '',
          staff_pwd: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          staff_acc: [{
            required: true,
            message: '账号不可为空',
            trigger: 'blur'
          }],
          staff_pwd: [{
            required: true,
            message: '密码不可为空',
            trigger: 'blur'
          }]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        let url = 'home/Login/userLogin'
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            //   this.$router.push('/main/' + this.form.username)
            request({
              url: 'admin/login',
              method: 'post',
              data: {
                staff_acc: this.form.staff_acc,
                staff_pwd: this.form.staff_pwd
              }
            }).then(res => {//响应成功判断
              if(res.data.code == '1001') {
                // 将账号存cookie
                // let cookieAcc = this.$getCookie('staffAcc');
                // console.log(cookieAcc);

                // 将行号存储session
                sessionStorage.setItem('staffAcc',this.form.staff_acc);
                // 将cookie存储Vuex
                this.$store.commit('setStaffAcc',this.form.staff_acc);
                console.log(this.$store.state.staffAcc);
                // 提示登录成功
                this.$message.success('登录成功,正在跳转页面');
                setTimeout( () => {
                  this.$router.push("/home?staffAcc=" + this.form.staff_acc);
                },2000) 
              } else if (res.data.code == '1002') {
                this.$message.success('登录失败，账号或密码错误');
              }              
            }).catch(err => {
              console.log(err);
            })
          } else {
            this.dialogVisible = true
            return false
          }
        })
      }
    },
    mounted() {
      
    },
  }

</script>
<style>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

</style>
