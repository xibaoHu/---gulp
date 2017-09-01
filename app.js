var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('./router/router.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var qs = require('querystring');
const common = require('./libs/common.js');

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./public'));
var users = {};
var offUsers = [];
var rooms = {
  '大厅': []
};

app.get('/', function (req, res, next) {
  if (req.cookies.name) {
    router.showIndex(req, res, next);
  } else {
    res.redirect('/login');
  }
});

app.get('/login', router.showLogin);

app.post('/login', function (req, res, next) {
  if (users[req.body.name]) {
    res.send('-1')
    return ;
  } else {
    res.cookie('name', req.body.name);
    res.redirect('/');
  }
})

io.sockets.on('connection', function (socket) {
  // 登陆成功
  socket.on('online', function (name) {
    socket.user = name;

    if (name in users) {
      socket.emit('existed user');
      return;
    }
    users[name] = socket;
    socket.leaveAll();
    socket.room = '大厅';
    socket.join('大厅');
    rooms['大厅'].push(socket.user);

    // 如果是刷新进来的用户，则进入大厅
    if (offUsers.includes(name)) {
      offUsers = offUsers.filter(offUser => {
        return !(offUser == name)
      })
      socket.to(socket.room)
        .emit('system', socket.user + '进入' + socket.room)
      socket.emit('system', '欢迎您进入' + socket.room)
    } else {
      socket.emit('system', '欢迎您加入聊天室');
      socket.broadcast.emit('system', socket.user + '上线了');
    }

    // 刷新房间列表
    for (let i in users) {
      users[i].emit('refresh rooms', {
        rooms: rooms,
        active: users[i].room
      })
    }

    // 更新用户列表
    io.emit('online number', Object.keys(users).length);
    socket.emit('refresh users', rooms[socket.room]);
    socket.to(socket.room).emit('refresh users', rooms[socket.room])
  })

  // 发送消息
  socket.on('send msg', function (content) {
    socket.to(socket.room).emit('send msg', {
      name: socket.user,
      content: content,
      time: common.getTime()
    })
  })

  // 添加房间
  socket.on('add room', function (room) {
    rooms[room] = [];
    // rooms.push(room);
    // common.removeItem(rooms[socket.room], socket.user);
    // rooms[room] = [socket.user];

    // let from = socket.room;
    // socket.room = room;

    // socket.to(from)
    //   .emit('system', socket.user + '离开' + from);
    // socket.to(from)
    //   .emit('refresh users', rooms[from]);

    // socket.leaveAll();
    // socket.join(socket.room);

    // socket.to(socket.room)
    //   .emit('system', socket.user + '进入' + socket.room);
    // socket.emit('system', '欢迎您进入' + socket.room);
    // socket.emit('refresh users', rooms[socket.room])
    
    // for (let i in users) {
    //   users[i].emit('refresh rooms', {
    //     rooms: rooms,
    //     active: users[i].room
    //   })
    // }
  })

  // 用户离线
  socket.on('disconnect', function () {
    delete users[socket.user];
    offUsers.push(socket.user);

    common.removeItem(rooms[socket.room], socket.user)

    socket.to(socket.room)
      .emit('refresh users', rooms[socket.room]);
    
    if (!rooms[socket.room]) return;
    if (rooms[socket.room].length > 0 || socket.room == '大厅') {
      socket.to(socket.room)
        .emit('system', socket.user + '离开' + socket.room);
    } else {
      delete rooms[socket.room];
    }
    for (let i in users) {
      users[i].emit('refresh rooms', {
        rooms: rooms,
        active: users[i].room
      })
    }

    setTimeout(function () {
      if (offUsers.includes(socket.user)) {
        offUsers = offUsers.filter(offUser => {
          return !(offUser == socket.user)
        })

        socket.broadcast.emit('system', socket.user + '下线了');
        io.emit('online number', Object.keys(users).length);
      }
    }, 3000);
  })

  // 切换房间
  socket.on('change room', function (to) {
    let from = socket.room;
    common.removeItem(rooms[from], socket.user);
    
    rooms[to].push(socket.user);
    socket.room = to;
    
    // 离开房间通知
    if (rooms[from].length > 0 || from == '大厅') {
      socket.to(from)
        .emit('system', socket.user + '离开' + from);
    } else {
      delete rooms[from];
    }
    for (let i in users) {
      users[i].emit('refresh rooms', {
        rooms: rooms,
        active: users[i].room
      })
    }
    
    socket.leaveAll();
    socket.join(socket.room);

    socket.to(from)
      .emit('refresh users', rooms[from]);

    // 进入房间通知
    io.to(socket.room)
      .emit('refresh users', rooms[socket.room]);
    socket.to(socket.room)
      .emit('system', socket.user + '进入' + socket.room);
    socket.emit('system', '欢迎您进入' + to);
  })
})

// function removeItem (items, item) {
//   if (!items) return;
//   let index = items.indexOf(item);
//   if (index == -1) return;
//   items.splice(index, 1)
// }

server.listen(3000, () => {
  console.log('listening at 3000');
})