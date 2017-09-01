var socket = io.connect();

const msg = $('.msg');
const users = $('.users');
const sendBtn = $('.send_btn');
const clearBtn = $('.clear_btn')
const info = $('.say_info');
const content = $('.content_saying');
const addRoom = $('.addRoom');
const roomsList = $('.rooms_list');
const onlineNum = $('.onlineNum');
const now = $('.now');
let ctrl = false;

// 登录
socket.emit('online', $.cookie('name'));

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

// 用户名冲突
socket.on('existed user', function () {
  let name = prompt('您的用户名与已在线的用户冲突，请换名重新登录');
  while(!name || strLen(name) > 20) {
    name = prompt('用户名的格式不正确，不能为空或者大于20');
  }
  $.cookie('name', name)
  socket.emit('online', $.cookie('name'));
})

// 刷新房间列表
socket.on('refresh rooms', function ({rooms, active}) {
  roomsList.empty();
  for (let room of Object.keys(rooms)) {
    // if (room == active) {
    //   roomsList.append(`<li class="active_room" data-room="${room}">
    //     <span class="room">${room}</span>
    //     <span class="usersNum">${rooms[room].length}人</span>
    //   </li>`)
    // } else {
    //   roomsList.append(`<li data-room="${room}">
    //     <span class="room">${room}</span>
    //     <span class="usersNum">${rooms[room].length}人</span>
    //   </li>`)
    // }
    let li_room = $(`<li data-room="${room}"></li>`);
    let span_room = $('<span class="room"></span>').text(room)
    let span_num = $(`<span class="usersNum">${rooms[room].length}人</span>`);
    if (room == active) {
      li_room.addClass('active_room');
    }
    
    li_room.append(span_room).append(span_num);
    roomsList.append(li_room);
  }
  now.text(active);
})

// 用户人数
socket.on('online number', function (num) {
  onlineNum.text(num)
  onlineNum.attr('title', `总共${num}人在线`)
})

// 添加房间
addRoom.click(function () {
  let room = prompt('请输入房间的名字');
  let exist = false
  room = room ? room.trim() : '';
  
  Array.from($('.rooms_list li .room')).forEach(item => {
    if (item.innerText == room) {
      exist = true;
      alert('房间已经存在');
    }
  })
  let roomLen = strLen(room);

  if (roomLen > 20) {
    alert('房间名字长度超过20');
    return;
  }
  if (roomLen > 0 && !exist) {
    // $('.rooms_list li').removeClass('active_room');
    // roomsList.append(`<li class="active_room">${room}</li>`);
    
    socket.emit('add room', room);
    socket.emit('change room', room);
  }
})

// 切换房间
roomsList.click(function (e) {
  if ($(e.target).closest('li').attr('class') == 'active_room') return;
  
  let room = $(e.target).closest('li').data('room');

  if (!room) return;

  console.log($.cookie('name') + ' to ' + room);

  socket.emit('change room', room);
  $('.rooms_list li').removeClass('active_room')
  $(e.target).closest('li').addClass('active_room')
})

// 清屏
clearBtn.click(function () {
  msg.empty();
})

// 系统消息通知
socket.on('system', function (info) {
  let li_sys = $('<li class="system"></li>').text(info)
  msg.append(li_sys);
  msg.scrollTop(9999999999999);
})

// 发送消息
sendBtn.click(sendMsg)
document.onkeydown = function (e) {
  if (e.keyCode == 17) ctrl = true;
}
document.onkeyup = function (e) {
  if (e.keyCode == 17) ctrl = false;
}
info.keydown(function (e) {
  if (e.keyCode == 13) {
    if (ctrl) {
      sendMsg();
      return false;
    }
    document.execCommand('insertHTML', false, '<br><br>');
    return false;
  }
})

socket.on('send msg', function (info) {
  // msg.append(`<li class="info">
  //   <p class="info_user others_info_user">${info.name}</p>
  //   <p class="info_content others_info_content">${info.content}</p>
  // </li>`)
  let li_info = $('<li class="info"></li>');
  let span_time = $(`<span class="info_time others_info_time">${info.time}</span>`)
  let p_user = $('<p class="info_user others_info_user"></p>').text(info.name).append(span_time);
  let p_content = $('<p class="info_content others_info_content"></p>').text(info.content);

  li_info.append(p_user).append(p_content);
  msg.append(li_info);

  msg.scrollTop(99999999999999)
})

function sendMsg () {
  let content = info.text().trim();
  if (!content) {
    alert('请输入内容')
    return;
  }
  info.text('').focus();
  socket.emit('send msg', content);

  // msg.append(`<li class="info mine_info">
  //   <p class="info_user mine_info_user">${$.cookie('name')}</p>
  //   <p class="info_content mine_info_content">${content}</p>
  // </li>`)

  // msg.append($(`<li class="info mine_info">
  //   <p class="info_user mine_info_user">${$.cookie('name')}</p>
  // </li>`).append($('<p class="info_content mine_info_content"></p>').text(content)))
  let li_info = $('<li class="info mine_info"></li>');
  let span_time = $(`<span class="info_time mine_info_time">${getTime()}</span>`)
  let p_user = $('<p class="info_user mine_info_user"></p>').text($.cookie('name')).prepend(span_time);
  let p_content = $('<p class="info_content mine_info_content"></p>').text(content);

  li_info.append(p_user).append(p_content);
  msg.append(li_info);
  
  msg.scrollTop(99999999999999)
}

function strLen (str) {
  return str.replace(/[^\x00-\xff]/g, '00').length
}

function getTime () {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours().toString().padStart(2, 0);
  let minute = now.getMinutes().toString().padStart(2, 0);
  let second = now.getSeconds().toString().padStart(2, 0);

  return year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second
}