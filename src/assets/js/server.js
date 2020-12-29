var ws = require('ws');
//获取server属性
var Server = ws.Server;
// 建立服务器监听             端口
var server = new Server({ port: 9000 });
//定义一个数组装socket
var clients = [];

server.on('connection', socket => {//连接服务器
    console.log('连接服务器');
    // socket.send(JSON.stringify('msgObj'))
    //消息事件
    socket.on('message', msg => {//服务器接收消息
        console.log(msg);
        let message = JSON.parse(msg);//收到消息JSON转化
        if (message.type == 'login') {//用户客服一对一聊天            
            // let so = clients[message.rever] //接收者
            // let fa = clients[message.sender]; //发送者
            let staffAcc = message.sender;//这是服务器发送给的人
            clients[staffAcc] = socket;
            let obj = {
                rever:staffAcc,
                content:message.content,
                type:'login'
            }
            socket.send(JSON.stringify(obj));
            console.log("发送");
        }
    });
    //关闭事件
    socket.on('close',() => {
        console.log('连接已关闭');
    });
    //出错事件
    socket.on('error',() => {
        console.log('出错事件');
    });
});
//服务器错误事件
server.on('error',err => {
    console.log(err);
});
console.log('服务器监听建立成功');