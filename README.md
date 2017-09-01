# Chat

> 简易版聊天室

## 技术栈

1. [express](https://expressjs.com/)
2. [socket.io](https://socket.io/)

## 功能

1. 实现
 - 实时聊天
 - 创建房间

2. 完善
 - 表情包

## 效果

### 登录
![login](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/chat_login.gif?raw=true)

服务端判断之前是否登录过聊天室，如果是则直接进入聊天室，否则跳转到登录页面。
```js
app.get('/', function (req, res, next) {
  if (req.cookies.name) {
    router.showIndex(req, res, next);
  } else {
    res.redirect('/login');
  }
});
```

### 聊天
![talk](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/chat_talk.gif?raw=true)
客户端发送消息，并接收服务端发来的消息
```js
// 发送消息
$('.send_btn').click(sendMsg)

function sendMsg () {
  // 判断消息消息是否为空
  let content = info.text().trim();
  if (!content) {
    alert('请输入内容')
    return;
  }

  // 发送消息后清空文本
  info.text('').focus();
  socket.emit('send msg', content);

  // 将自己发送的消息添加到消息列表当中
  let li_info = $('<li class="info mine_info"></li>');
  let span_time = $(`<span class="info_time mine_info_time">${getTime()}</span>`)
  let p_user = $('<p class="info_user mine_info_user"></p>').text($.cookie('name')).prepend(span_time);
  let p_content = $('<p class="info_content mine_info_content"></p>').text(content);

  li_info.append(p_user).append(p_content);
  msg.append(li_info);
}

// 监听来自同一房间发来的消息
socket.on('send msg', function (info) {
  // 将发送过来的消息添加到消息列表中
  let li_info = $('<li class="info"></li>');
  let span_time = $(`<span class="info_time others_info_time">${info.time}</span>`)
  let p_user = $('<p class="info_user others_info_user"></p>').text(info.name).append(span_time);
  let p_content = $('<p class="info_content others_info_content"></p>').text(info.content);

  li_info.append(p_user).append(p_content);
  msg.append(li_info);
})
```
服务端监听客户端发来的消息，并将接受到的消息转发给同一房间中的客户端
```js
socket.on('send msg', function (content) {
  // 发送消息给同一房间的客户端
  socket.to(socket.room).emit('send msg', {
    name: socket.user,
    content: content,
    time: common.getTime()
  })
})
```
### 创建房间
![room](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/chat_room.gif?raw=true)

创建房间可以分为两步：用户创建房间，用户切换至新的房间。

客户端发送创建房间和切换房间的事件给服务端。
```js
// 添加房间
addRoom.click(function () {
  // 对房间的判断之类省略...

  if (roomLen > 0 && !exist) {
    socket.emit('add room', room);
    socket.emit('change room', room);
  }
})

// 刷新用户列表
socket.on('refresh users', function (usersName) {
  users.empty();
  for (let userName of usersName) {
    let li = $('<li></li>').text(userName);
    if (userName == $.cookie('name')) {
      li.addClass('me')
    }
    users.append(li)
  }
})

// 刷新房间列表
socket.on('refresh rooms', function ({rooms, active}) {
  roomsList.empty();
  for (let room of Object.keys(rooms)) {
    let li_room = $(`<li data-room="${room}"></li>`);
    let span_room = $('<span class="room"></span>').text(room)
    let span_num = $(`<span class="usersNum">${rooms[room].length}人</span>`);
    if (room == active) {
      li_room.addClass('active_room');
    }
    
    li_room.append(span_room).append(span_num);
    roomsList.append(li_room);
  }
  // 更改标题的名称
  now.text(active);
})
```
服务端增加、切换房间，发送刷新房间列表、用户列表的事件给客户端
```js
// 增加房间
socket.on('add room', function (room) {
  rooms[room] = [];
})

// 切换房间
socket.on('change room', function (to) {
  // 记录用户离开的房间
  let from = socket.room;
  common.removeItem(rooms[from], socket.user);

  // 将用户传送到新的房间
  rooms[to].push(socket.user);
  socket.room = to;
  
  // 发送刷新用户列表的消息
  for (let i in users) {
    users[i].emit('refresh rooms', {
      rooms: rooms,
      active: users[i].room
    })
  }

  // 离开和加入新的房间
  socket.leaveAll();
  socket.join(socket.room);

  // 通知离开的房间刷新用户列表
  socket.to(from)
    .emit('refresh users', rooms[from]);

  // 通知进入的房间刷新用户列表
  io.to(socket.room)
    .emit('refresh users', rooms[socket.room]);
})
```
具体请看源码，谢谢!

## 最后

贴出来主要希望能吸收建议。

## Build Setup

``` bash
# install dependencies
npm install

# 运行 监听3001端口
gulp
```
