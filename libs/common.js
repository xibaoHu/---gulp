module.exports = {
  // 删除选项
  removeItem (items, item) {
    if (!items) return;
    let index = items.indexOf(item);
    if (index == -1) return;
    items.splice(index, 1)
  },
  // 获取时间
  getTime () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours().toString().padStart(2, 0);
    let minute = now.getMinutes().toString().padStart(2, 0);
    let second = now.getSeconds().toString().padStart(2, 0);
  
    return year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second
  }
}