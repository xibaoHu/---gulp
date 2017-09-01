// 展示首页
exports.showIndex = function (req, res, next) {
  res.render('index')
}

// 展示登录页面
exports.showLogin = function (req, res, next) {
  res.render('login')
}

// 登录
exports.login = function (req, res, next) {
  console.log(req.body)
  res.send(req.body)
}