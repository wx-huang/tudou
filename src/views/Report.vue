<template>
  <div>
    <!-- 报表面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报表统计</el-breadcrumb-item>
    </el-breadcrumb> 

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 根据条件查看报表 -->
      <div class="select_box">
        <!-- 选择from表单 -->        
        <el-form ref="form" :model="selForm">
          <!-- 选择需求 -->
          <el-form-item label="需  求">
            <el-select v-model="selForm.selOption" clearable placeholder="请选择查看内容">
              <el-option              
                v-for="item in allSelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 选择日期 -->
          <el-form-item label="时  间">
            <el-date-picker
              v-model="selForm.selDate"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <!-- 选择表类型 -->
          <el-form-item label="类  型">
            <el-radio v-model="selForm.tableType" label="1" border>饼图</el-radio>
            <el-radio v-model="selForm.tableType" label="2" border>柱状图</el-radio>
          </el-form-item>          
          <!-- 确定按钮 -->
          <el-form-item>
            <el-button type="primary" @click="selectSure">确定</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 报表显示 -->
      <!-- 1  为ECharts准备一个具备大小（宽高）的Dom -->
      <!-- <div id="main" style="width: 600px;height:400px;"></div> -->
      <div id="main" class="report_box"></div>
    </el-card>
  </div>
</template>

<script>

import {
  request
} from '../network/request.js';

export default {
  name: "",
  data () {
    return {
      // 确认时  查询报表数据
      selForm: {
        selOption:'',//需求选择
        selDate:'',//时间选择
        tableType:''//表结构
      },
      // 需求选择器数据
      allSelOptions: [{
        value: '1',
        label: '用户注册人数'
      }, {

        value: '2',
        label: '交易订单量'
      }, {
        value: '3',
        label: '交易成交额'
      }],
      // 报表数据
      // 1 柱状图
      caogao: {
          title: {
              x: 'left',
              text: ''
          },
          legend: {
            data:['人数']
          },
          tooltip: {},
          xAxis: {
              data: [4,5,6,7,8]
          },
          yAxis: {},
          series: [{
              name: '人数',
              type: 'bar',
              data: [4,5,6,7,8]
          }]
      },
      // 2 饼图
      pieReport: {
        series : [{
          name: '访问来源',
          type: 'pie',    // 设置图表类型为饼图
          radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
          data:[          // 数据数组，name 为数据项名称，value 为数据项值
              {value:235, name:'视频广告'},
              {value:274, name:'联盟广告'},
              {value:310, name:'邮件营销'},
              {value:335, name:'直接访问'},
              {value:400, name:'搜索引擎'}
          ]
      }]
    } 
  }
  },
  methods:{
    seeReport() {//报表渲染
      let echarts = require('echarts');
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      if(this.selForm.tableType == 2) {//如果选择柱状图
        let caogaoData = this.caogao;
        myChart.setOption(caogaoData);
        console.log("数据传输回来，选择柱状图2");
      } else if(this.selForm.tableType == 1) {//如果选择饼图
        let pieReportData = this.pieReport;        
        myChart.setOption(pieReportData);
        console.log("数据传输回来，选择饼图2");
      }      
    },
    selectSure() {//点击确认信息 查看报表      
      let selFormData = this.selForm;//选择的全部数据
      if(selFormData.selOption == 1) {
        this.caogao.title.text = '用户注册人数详情表';
      }
      console.log(this.selForm.tableType);
      // 请求数据
      request({
        url: 'admin/Report/selUserLodingTime',
        method: 'post',
        data: {
          selOption: this.selForm.selOption,
          selDateStar: this.selForm.selDate[0],
          selDateEnd: this.selForm.selDate[1],
          tableType: this.selForm.tableType
        }
      }).then(res => {
        // console.log(res.data.data);
        if(res.data.code == '3001') {
          let allArr = res.data.data;//后端传回的数据          
          if(allArr.length !== 0) {
            if(this.selForm.tableType == 2) {//如果选择柱状图
              let userNumArr = [];//表格水平行数据
              let monthTimeArr = [];//表格 值 数据
              allArr.forEach((item) => {
                userNumArr.push(item.userNum);
                monthTimeArr.push(item.monthTime + '月');
              })
              // 赋值
              this.caogao.xAxis.data = monthTimeArr;
              this.caogao.series[0].data = userNumArr;
              console.log("数据传输回来，选择柱状图1");
            } else if(this.selForm.tableType == 1) {//如果选择饼图
              this.pieReport.series[0].data = allArr;
              console.log('数据传输回来，选择饼图1');
              console.log(allArr);
            }            
          } else {
            this.$message.info('当前没有相关数据');
          }         
          // 渲染表格
          this.seeReport();        
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    // this.seeReport();
  }

}

</script>

<style>
  .el-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    position: relative;
    height: 550px;
  }

  .select_box {
    /* border: 1px solid; */
    width: 48%;
    height: 500px;
    text-align: left !important;
    position: absolute;
  }

  .report_box {
    /* border: 1px solid; */
    width: 48%;
    height: 500px;
    margin-left: 10px;
    position: absolute !important;
    display: inline-block;
  }

  .selClass {
    /* border: 1px solid; */
    text-align: left;
  }

  .selDate {
    /* border: 1px solid; */
    text-align: left;
  }

  .selReportStyle {
    /* border: 1px solid; */
    text-align: left;
  }



</style>