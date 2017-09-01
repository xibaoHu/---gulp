var btn = document.getElementById('submit');
var input = document.getElementsByClassName('name')[0];

btn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!(input.value).trim()) {
    alert('你输入名字');
    return false;
  } else if (strLen(input.value.trim()) > 20) {
    alert('名字的长度不能超过20');
    return false;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.response == -1) {
        alert('用户名被占用');
      } else {
        window.location.pathname = '/'
      }
    }
  }
  xhr.open('post', '/login');

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'name=' + input.value.trim()
  xhr.send(data)
}, false)

function strLen (str) {
  return str.replace(/[^\x00-\xff]/g, '00').length
}