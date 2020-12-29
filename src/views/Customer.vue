<template>
  <div class="chat_box">    
    <div class="header">
      <!-- <span>客服聊天</span> -->
    </div>
    <div class="main">
      <div class="chatMain">
        <div class="chatList">
          <!-- <p style="height:10px;" v-for="(item,index) in chatList" :key="index">{{item}}</p> -->
        </div>
        <div class="chatEnter">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
          <el-button class="chatBtn" @click="chatSend">发送</el-button>
        </div>
      </div>
      <div class="chatPeople">
        <span>消息用户</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  data () {
    return {
      chatList: ['123','464','789'],//聊天记录
      textarea: ''
    }
  },
  methods:{
    chatSend() {//点击发送
      //聊天记录  通过type字段进行区分是自己（mine）发的还是系统（robot）返回的
      this.chatList = [...this.list,{type: "mine",content:this.textarea}];
      this.backChat(() => {
        this.textarea = '';//加回调在得到返回数据的时候清除输入框的内容
      })
    },
    backChat() {
      // if(window.WebSocket) {
        let ws = new Websocket("ws://127.0.0.1:9000");
        ws.onopen = e => {
          // 存session里的当前的用户
          let staffAcc = sessionStorage.getItem('staffAcc');
          console.log('onopen 将要发送的内容是：', this.textarea);
          let obj = {// 发送信息
            type: 'login',
            sender: staffAcc,
            rever: 'serve',
            content: '登录成功'
          }          
          ws.send(JSON.stringify(obj));//发送给服务器
        };
        ws.onmessage = function(e) {//接收消息
          console.log('123123132==================');
          let msg = JSON.parse(e.data);
          console.log(msg);
          console.log("登录成功");    
          if(msg.type == 'login') {
            console.log("登录成功哈哈哈哈哈");
          }
                
          // this.chatList = [...this.chatList, { type: "robot", content: e.data }];
        };
        ws.onclose = e => {
          console.log("服务器关闭");
        };
        ws.onerror = e => {
          console.log("服务器出错");
        };        
      }
    // }
  },
  mounted() {
    // this.backChat()
    let ws = new WebSocket("ws://127.0.0.1:9000");
        ws.onopen = e => {
          let staffAcc = sessionStorage.getItem('staffAcc');
          console.log(staffAcc + "===session客服页面");
          console.log('onopen服务器连接成功');
          console.log('onopen 将要发送的内容是：', this.textarea);
          let obj = {// 发送信息
            type: 'login',
            sender: staffAcc,
            rever: 'serve',
            content: '登录成功'
          }          
          ws.send(JSON.stringify(obj));//发送给服务器
        };
  },
}

</script>

<style>
.chat_box {
  /* border: 1px solid black; */
  width: 800px;
  height: 500px;  
}
.main {
  border: 1px solid #F3F3F3;
  height: 448px;
  width: 100%;
  display: flex;
  background-color: white;
}
.header {
  /* border: 1px solid black; */
  height: 50px;
  width: 100%;
  background-color: #409EFF;
  text-align: center;
  color: white;
}
.chatMain {
  border: 1px solid #F3F3F3;
  height: 100%;
  width: 70%;

}
.chatPeople {
  border: 1px solid #F3F3F3;
  width: 29.9%;
  height: 100%;
}
.chatList {
  width: 100%;
  height: 70%;
  border: 1px solid #F3F3F3;
}
.chatEnter {
  width: 100%;
  height: 29%;
  border: 1px solid #F3F3F3;
  display: flex;
}
textarea {
  width: 30%;
  height: 80%;
  border: none;
}
.chatBtn {
  height: 50px;
}
</style>