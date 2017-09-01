"use strict";function sendMsg(){var e=info.text().trim();if(e){info.text("").focus(),socket.emit("send msg",e);var t=$('<li class="info mine_info"></li>'),o=$('<span class="info_time mine_info_time">'+getTime()+"</span>"),n=$('<p class="info_user mine_info_user"></p>').text($.cookie("name")).prepend(o),s=$('<p class="info_content mine_info_content"></p>').text(e);t.append(n).append(s),msg.append(t),msg.scrollTop(99999999999999)}else alert("请输入内容")}function strLen(e){return e.replace(/[^\x00-\xff]/g,"00").length}function getTime(){var e=new Date;return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()+" "+e.getHours().toString().padStart(2,0)+":"+e.getMinutes().toString().padStart(2,0)+":"+e.getSeconds().toString().padStart(2,0)}var socket=io.connect(),msg=$(".msg"),users=$(".users"),sendBtn=$(".send_btn"),clearBtn=$(".clear_btn"),info=$(".say_info"),content=$(".content_saying"),addRoom=$(".addRoom"),roomsList=$(".rooms_list"),onlineNum=$(".onlineNum"),now=$(".now"),ctrl=!1;socket.emit("online",$.cookie("name")),socket.on("refresh users",function(e){users.empty();var t=!0,o=!1,n=void 0;try{for(var s,r=e[Symbol.iterator]();!(t=(s=r.next()).done);t=!0){var i=s.value,a=$("<li></li>").text(i);i==$.cookie("name")&&a.addClass("me"),users.append(a)}}catch(e){o=!0,n=e}finally{try{!t&&r.return&&r.return()}finally{if(o)throw n}}}),socket.on("existed user",function(){for(var e=prompt("您的用户名与已在线的用户冲突，请换名重新登录");!e||strLen(e)>20;)e=prompt("用户名的格式不正确，不能为空或者大于20");$.cookie("name",e),socket.emit("online",$.cookie("name"))}),socket.on("refresh rooms",function(e){var t=e.rooms,o=e.active;roomsList.empty();var n=!0,s=!1,r=void 0;try{for(var i,a=Object.keys(t)[Symbol.iterator]();!(n=(i=a.next()).done);n=!0){var c=i.value,l=$('<li data-room="'+c+'"></li>'),m=$('<span class="room"></span>').text(c),p=$('<span class="usersNum">'+t[c].length+"人</span>");c==o&&l.addClass("active_room"),l.append(m).append(p),roomsList.append(l)}}catch(e){s=!0,r=e}finally{try{!n&&a.return&&a.return()}finally{if(s)throw r}}now.text(o)}),socket.on("online number",function(e){onlineNum.text(e),onlineNum.attr("title","总共"+e+"人在线")}),addRoom.click(function(){var e=prompt("请输入房间的名字"),t=!1;e=e?e.trim():"",Array.from($(".rooms_list li .room")).forEach(function(o){o.innerText==e&&(t=!0,alert("房间已经存在"))});var o=strLen(e);o>20?alert("房间名字长度超过20"):o>0&&!t&&(socket.emit("add room",e),socket.emit("change room",e))}),roomsList.click(function(e){if("active_room"!=$(e.target).closest("li").attr("class")){var t=$(e.target).closest("li").data("room");t&&(console.log($.cookie("name")+" to "+t),socket.emit("change room",t),$(".rooms_list li").removeClass("active_room"),$(e.target).closest("li").addClass("active_room"))}}),clearBtn.click(function(){msg.empty()}),socket.on("system",function(e){var t=$('<li class="system"></li>').text(e);msg.append(t),msg.scrollTop(9999999999999)}),sendBtn.click(sendMsg),document.onkeydown=function(e){17==e.keyCode&&(ctrl=!0)},document.onkeyup=function(e){17==e.keyCode&&(ctrl=!1)},info.keydown(function(e){if(13==e.keyCode)return ctrl?(sendMsg(),!1):(document.execCommand("insertHTML",!1,"<br><br>"),!1)}),socket.on("send msg",function(e){var t=$('<li class="info"></li>'),o=$('<span class="info_time others_info_time">'+e.time+"</span>"),n=$('<p class="info_user others_info_user"></p>').text(e.name).append(o),s=$('<p class="info_content others_info_content"></p>').text(e.content);t.append(n).append(s),msg.append(t),msg.scrollTop(99999999999999)});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNlbmRNc2ciLCJjb250ZW50IiwiaW5mbyIsInRleHQiLCJ0cmltIiwiY2xlYXJCdG4iLCJmb2N1cyIsInNvY2tldCIsImVtaXQiLCJsaV9pbmZvIiwiJCIsImRvY3VtZW50IiwiZ2V0VGltZSIsImUiLCJjb29raWUiLCJwcmVwZW5kIiwic3Bhbl90aW1lIiwicF9jb250ZW50Iiwia2V5Q29kZSIsInBfdXNlciIsImFwcGVuZCIsIm1zZyIsInNjcm9sbFRvcCIsImVtcHR5Iiwic3RyTGVuIiwic3RyIiwicmVwbGFjZSIsImxlbmd0aCIsIm5vdyIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJnZXRTZWNvbmRzIiwiaW8iLCJjb25uZWN0IiwidXNlcnMiLCJzZW5kQnRuIiwiYWRkUm9vbSIsInJvb21zTGlzdCIsIm9ubGluZU51bSIsIm9uIiwidXNlcnNOYW1lIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJ1bmRlZmluZWQiLCJ1c2VyTmFtZSIsIl9zdGVwIiwidmFsdWUiLCJsaSIsImFkZENsYXNzIiwiZXJyIiwiX2l0ZXJhdG9yIiwicmV0dXJuIiwibmFtZSIsInByb21wdCIsIl9yZWYiLCJyb29tcyIsImFjdGl2ZSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX3N0ZXAyIiwiX2l0ZXJhdG9yMiIsIk9iamVjdCIsImtleXMiLCJTeW1ib2wiLCJpdGVyYXRvciIsIm5leHQiLCJkb25lIiwicm9vbSIsInNwYW5fcm9vbSIsImxpX3Jvb20iLCJzcGFuX251bSIsIm51bSIsImF0dHIiLCJjbGljayIsImV4aXN0IiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsIml0ZW0iLCJpbm5lclRleHQiLCJhbGVydCIsInJvb21MZW4iLCJ0YXJnZXQiLCJjbG9zZXN0IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmVDbGFzcyIsImN0cmwiLCJvbmtleXVwIiwia2V5ZG93biIsImV4ZWNDb21tYW5kIiwidGltZSJdLCJtYXBwaW5ncyI6ImFBa0tBLFNBQVNBLFVBL0NULElBQUFDLEVBQUFDLEtBQUFDLE9BQUFDLE9BQ0FDLEdBQUFBLEVBQUFBLENBSUFILEtBQUFDLEtBQUEsSUFBQUcsUUFDQUMsT0FBQUMsS0FBVSxXQUFVUCxHQVFwQixJQUFBUSxFQUFBQyxFQUFBLG9DQUdBQyxFQUFBRCxFQUFBQSwwQ0FBZ0NFLFVBQWhDLFdBQ01DLEVBQUFILEVBQUEsNENBQWlCUCxLQUFBTyxFQUFBSSxPQUFBLFNBQUFDLFFBQUFDLEdBRHZCQyxFQUFBUCxFQUFBLGtEQUFBUCxLQUFBRixHQUlFUSxFQUFNUyxPQUFGQyxHQUFpQkMsT0FBQUgsR0FDbkJJLElBQUFELE9BQUFYLEdBRUVZLElBQUFDLFVBQU8scUJBdEJYRCxNQUFJRSxTQXlCRixTQUFBQyxPQUFBQyxHQUNELE9BQUFBLEVBQUFDLFFBQUEsZ0JBQUEsTUFBQUMsT0FHSHBCLFNBQUFLLFVBQ0UsSUFBQWdCLEVBQUEsSUFBQUMsS0F3REEsT0F2REFELEVBQUFFLGNBdURZLEtBdERaRixFQUFBRyxXQUFBLEdBc0RzQixJQXJEdEJILEVBQUFJLFVBcUQrQixJQXBEM0J2QixFQUFVQyxXQUFFdUIsV0FBQUMsU0FBaEIsRUFBQSxHQW9Ed0MsSUFuRHBDbEIsRUFBWU4sYUFBQUEsV0FBQUEsU0FBQUEsRUFBQUEsR0FtRG1DLElBbER0Q0EsRUFBRXlCLGFBQUFGLFdBQUFDLFNBQUEsRUFBQSxHQXpKakIsSUFBSTNCLE9BQVM2QixHQUFHQyxVQUFaOUIsSUFBQUEsRUFBUzZCLFFBR1BFLE1BQVE1QixFQUFFLFVBRFZXLFFBQVFYLEVBQUYsYUFDTjRCLFNBQVU1QixFQUFBLGNBQ1Y2QixLQUFBQSxFQUFVN0IsYUFDVkwsUUFBV0ssRUFBRSxtQkFDYlIsUUFBU1EsRUFBQSxZQUNUVCxVQUFZUyxFQUFBLGVBQ1o4QixVQUFZOUIsRUFBQSxjQUNaK0IsSUFBQUEsRUFBQUEsUUFDQUMsTUFBQUEsRUFLTm5DLE9BQU9DLEtBQUssU0FBVUUsRUFBRUksT0FBTyxTQUcvQlAsT0FBT29DLEdBQUcsZ0JBQWlCLFNBQVVDLEdBRHJDTixNQUFBZixRQUNnRCxJQUFBc0IsR0FBQSxFQUFBQyxHQUFBLEVBQUFDLE9BQUFDLEVBQUEsSUFBaER6QyxJQUFBQSxJQUFBQSxFQUFBQSxFQUFVcUMsRUFBVnJDLE9BQUFBLGNBQUFBLEdBQUFBLEVBQUFBLEVBQUFBLFFBQUFBLE1BQUFBLEdBQUFBLEVBQTJCLENBQUEsSUFBakIwQyxFQUFpQkMsRUFBQUMsTUFDbkI1QixFQUFOYixFQUFBLGFBQUFQLEtBQUE4QyxHQUQ4Q0EsR0FBQXZDLEVBQUFJLE9BQUEsU0FBQXNDLEVBQUFDLFNBQUEsTUFPNUNmLE1BQU1sQixPQUFPZ0MsSUFQK0IsTUFBQUUsR0FBQVIsR0FBQSxFQUFBQyxFQUFBTyxFQUFBLFFBQUEsS0FBQVQsR0FBQVUsRUFBQUMsUUFBQUQsRUFBQUMsU0FBQSxRQUFBLEdBQUFWLEVBQUEsTUFBQUMsTUFHNUN4QyxPQUFBb0MsR0FBSVMsZUFBTyxXQUVUQSxJQURGLElBQUFLLEVBQUlSLE9BQUFBLDJCQUNGRyxHQUFHQyxPQUFISSxHQUFBLElBQ0RBLEVBQUFDLE9BQUEsd0JBRUZoRCxFQUFBSSxPQUFBLE9BQUEyQyxHQVI2Q2xELE9BQUFDLEtBQUEsU0FBQUUsRUFBQUksT0FBQSxXQUFBUCxPQUFBb0MsR0FBQSxnQkFBQSxTQUFBZ0IsR0FBQSxJQUFBQyxFQUFBRCxFQUFBQyxNQUFBQyxFQUFBRixFQUFBRSxPQUFBcEIsVUFBQWxCLFFBQUEsSUFBQXVDLEdBQUEsRUFBQUMsR0FBQSxFQUFBQyxPQUFBaEIsRUFBQSxJQUFBLElBQUEsSUFBQWlCLEVBQUFDLEVBQUFDLE9BQUFDLEtBQUFSLEdBQUFTLE9BQUFDLGNBQUFSLEdBQUFHLEVBQUFDLEVBQUFLLFFBQUFDLE1BQUFWLEdBQUEsRUFBQSxDQUFBLElBQUFXLEVBQUFSLEVBQUFkLE1BYTFDTSxFQUFPQyxFQUFBQSxrQkFBT2UsRUFBUGYsV0FDWGdCLEVBQWVsRCxFQUFBQSw4QkFBbUJyQixLQUFBc0UsR0FDaENoQixFQUFjL0MsRUFBQUEsMEJBQWRrRCxFQUFBYSxHQUFBOUMsT0FBYyxZQUNmOEMsR0FBQVosR0FDQy9DLEVBQU91QyxTQUFULGVBMEJFc0IsRUFBUXZELE9BQU9zRCxHQUFXdEQsT0FBT3dELEdBdEJyQ25DLFVBQUFyQixPQUFBdUQsSUFyQmdELE1BQUFyQixHQUFBUyxHQUFBLEVBQUFDLEVBQUFWLEVBQUEsUUFBQSxLQUFBUSxHQUFBSSxFQUFBVixRQUFBVSxFQUFBVixTQUFBLFFBQUEsR0FBQU8sRUFBQSxNQUFBQyxHQXNCTXBDLElBQWhCZ0MsS0FBZ0JDLEtBQUF0RCxPQUFBb0MsR0FBQSxnQkFBQSxTQUFBa0MsR0FBQW5DLFVBQUF2QyxLQUFBMEUsR0FBQW5DLFVBQUFvQyxLQUFBLFFBQUEsS0FBQUQsRUFBQSxTQUVmckMsUUFBQXVDLE1BQUEsV0FpQ3JDLElBQUlOLEVBQU9mLE9BQU8sWUFoQ2hCc0IsR0FBQSxFQUNBUCxFQUFBQSxFQUFBQSxFQUFBckUsT0FBQSxHQUVBNkUsTUFBQUMsS0FBQXhFLEVBQUEseUJBQUF5RSxRQUFBLFNBQUFDLEdBQ0FBLEVBQUFDLFdBQUFaLElBQ0FPLEdBQUEsRUFDQU0sTUFBQSxhQUdBLElBQUFDLEVBQUEvRCxPQUFBaUQsR0FFQWMsRUFBSVosR0FDSlcsTUFBSVosY0FHRkMsRUFBUXRCLElBQUFBLElBSVZaLE9BQUFBLEtBQVVyQixXQUFPdUQsR0FDbEJwRSxPQUFBQyxLQUFBLGNBQUFpRSxNQXZCbURoQyxVQUFBc0MsTUFBQSxTQUFBbEUsR0FBQSxHQUFBLGVBQUFILEVBQUFHLEVBQUEyRSxRQUFBQyxRQUFBLE1BQUFYLEtBQUEsU0FBQSxDQUFBLElBQUFMLEVBQUEvRCxFQUFBRyxFQUFBMkUsUUFBQUMsUUFBQSxNQUFBQyxLQUFBLFFBQUFqQixJQUFBa0IsUUFBQUMsSUFBQWxGLEVBQUFJLE9BQUEsUUFBQSxPQUFBMkQsR0FBQWxFLE9BQUFDLEtBQUEsY0FBQWlFLEdBdUVwRC9ELEVBQUUsa0JBQWtCbUYsWUFBWSxlQS9DaENqRSxFQUFBQSxFQUFJekIsUUFBSzBELFFBQVQsTUFBQVIsU0FBQSxtQkFJRjlDLFNBQUF3RSxNQUFVLFdBQ1JyQyxJQUFBQSxVQUlGbkMsT0FBQW9DLEdBQUEsU0FBQSxTQUFBekMsR0FDQXNDLElBQUFBLEVBQWM5QixFQUFBLDRCQUFZUCxLQUFBRCxHQUN4Qm1CLElBQUlvRCxPQUFPZixHQUNYckMsSUFBSTJELFVBQVEsaUJBSVZ6QyxRQUFJNkMsTUFBS0MsU0FDUEwsU0FBQUEsVUFBQSxTQUFBbkUsR0FDTSxJQUFOeUUsRUFBQUEsVUFBQVEsTUFBQSxJQUVIbkYsU0FMRG9GLFFBQUEsU0FBQWxGLEdBTWNXLElBQVYrRCxFQUFBQSxVQUFpQmQsTUFBckIsSUFFQXZFLEtBQUE4RixRQUFJVCxTQUFjMUUsR0FDaEJ5RSxHQUFNLElBQU5BLEVBQUFBLFFBQ0EsT0FBQVEsTUFDRDlGLFdBQ0d1RixJQUVGNUUsU0FBQXNGLFlBQUEsY0FBQSxFQUFBLGFBaURPLEtBNUNWMUYsT0F4QkRvQyxHQUFBLFdBQUEsU0FBQXpDLEdBNkVFLElBQUlPLEVBQVVDLEVBQUUsMEJBL0NaK0QsRUFBV2UsRUFBQUEsNENBQWZ0RixFQUFBZ0csS0FBZVYsV0FpRFhyRSxFQUFTVCxFQUFFLDhDQUE4Q1AsS0FBS0QsRUFBS3VELE1BQU1yQyxPQUFPSixHQS9DaEZDLEVBQU9QLEVBQUEsb0RBQUFQLEtBQUFELEVBQUFELFNBRVgwRixFQUFRQyxPQUFNOUUsR0FBT00sT0FBVEgsR0FpRFpJLElBQUlELE9BQU9YLEdBOUNYQyxJQUFFWSxVQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoKTtcblxuY29uc3QgbXNnID0gJCgnLm1zZycpO1xuY29uc3QgdXNlcnMgPSAkKCcudXNlcnMnKTtcbmNvbnN0IHNlbmRCdG4gPSAkKCcuc2VuZF9idG4nKTtcbmNvbnN0IGNsZWFyQnRuID0gJCgnLmNsZWFyX2J0bicpXG5jb25zdCBpbmZvID0gJCgnLnNheV9pbmZvJyk7XG5jb25zdCBjb250ZW50ID0gJCgnLmNvbnRlbnRfc2F5aW5nJyk7XG5jb25zdCBhZGRSb29tID0gJCgnLmFkZFJvb20nKTtcbmNvbnN0IHJvb21zTGlzdCA9ICQoJy5yb29tc19saXN0Jyk7XG5jb25zdCBvbmxpbmVOdW0gPSAkKCcub25saW5lTnVtJyk7XG5jb25zdCBub3cgPSAkKCcubm93Jyk7XG5sZXQgY3RybCA9IGZhbHNlO1xuXG4vLyDnmbvlvZVcbnNvY2tldC5lbWl0KCdvbmxpbmUnLCAkLmNvb2tpZSgnbmFtZScpKTtcblxuLy8g5Yi35paw55So5oi35YiX6KGoXG5zb2NrZXQub24oJ3JlZnJlc2ggdXNlcnMnLCBmdW5jdGlvbiAodXNlcnNOYW1lKSB7XG4gIHVzZXJzLmVtcHR5KCk7XG4gIGZvciAobGV0IHVzZXJOYW1lIG9mIHVzZXJzTmFtZSkge1xuICAgIGxldCBsaSA9ICQoJzxsaT48L2xpPicpLnRleHQodXNlck5hbWUpO1xuICAgIGlmICh1c2VyTmFtZSA9PSAkLmNvb2tpZSgnbmFtZScpKSB7XG4gICAgICBsaS5hZGRDbGFzcygnbWUnKVxuICAgIH1cbiAgICB1c2Vycy5hcHBlbmQobGkpXG4gIH1cbn0pXG5cbi8vIOeUqOaIt+WQjeWGsueqgVxuc29ja2V0Lm9uKCdleGlzdGVkIHVzZXInLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBuYW1lID0gcHJvbXB0KCfmgqjnmoTnlKjmiLflkI3kuI7lt7LlnKjnur/nmoTnlKjmiLflhrLnqoHvvIzor7fmjaLlkI3ph43mlrDnmbvlvZUnKTtcbiAgd2hpbGUoIW5hbWUgfHwgc3RyTGVuKG5hbWUpID4gMjApIHtcbiAgICBuYW1lID0gcHJvbXB0KCfnlKjmiLflkI3nmoTmoLzlvI/kuI3mraPnoa7vvIzkuI3og73kuLrnqbrmiJbogIXlpKfkuo4yMCcpO1xuICB9XG4gICQuY29va2llKCduYW1lJywgbmFtZSlcbiAgc29ja2V0LmVtaXQoJ29ubGluZScsICQuY29va2llKCduYW1lJykpO1xufSlcblxuLy8g5Yi35paw5oi/6Ze05YiX6KGoXG5zb2NrZXQub24oJ3JlZnJlc2ggcm9vbXMnLCBmdW5jdGlvbiAoe3Jvb21zLCBhY3RpdmV9KSB7XG4gIHJvb21zTGlzdC5lbXB0eSgpO1xuICBmb3IgKGxldCByb29tIG9mIE9iamVjdC5rZXlzKHJvb21zKSkge1xuICAgIC8vIGlmIChyb29tID09IGFjdGl2ZSkge1xuICAgIC8vICAgcm9vbXNMaXN0LmFwcGVuZChgPGxpIGNsYXNzPVwiYWN0aXZlX3Jvb21cIiBkYXRhLXJvb209XCIke3Jvb219XCI+XG4gICAgLy8gICAgIDxzcGFuIGNsYXNzPVwicm9vbVwiPiR7cm9vbX08L3NwYW4+XG4gICAgLy8gICAgIDxzcGFuIGNsYXNzPVwidXNlcnNOdW1cIj4ke3Jvb21zW3Jvb21dLmxlbmd0aH3kuro8L3NwYW4+XG4gICAgLy8gICA8L2xpPmApXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHJvb21zTGlzdC5hcHBlbmQoYDxsaSBkYXRhLXJvb209XCIke3Jvb219XCI+XG4gICAgLy8gICAgIDxzcGFuIGNsYXNzPVwicm9vbVwiPiR7cm9vbX08L3NwYW4+XG4gICAgLy8gICAgIDxzcGFuIGNsYXNzPVwidXNlcnNOdW1cIj4ke3Jvb21zW3Jvb21dLmxlbmd0aH3kuro8L3NwYW4+XG4gICAgLy8gICA8L2xpPmApXG4gICAgLy8gfVxuICAgIGxldCBsaV9yb29tID0gJChgPGxpIGRhdGEtcm9vbT1cIiR7cm9vbX1cIj48L2xpPmApO1xuICAgIGxldCBzcGFuX3Jvb20gPSAkKCc8c3BhbiBjbGFzcz1cInJvb21cIj48L3NwYW4+JykudGV4dChyb29tKVxuICAgIGxldCBzcGFuX251bSA9ICQoYDxzcGFuIGNsYXNzPVwidXNlcnNOdW1cIj4ke3Jvb21zW3Jvb21dLmxlbmd0aH3kuro8L3NwYW4+YCk7XG4gICAgaWYgKHJvb20gPT0gYWN0aXZlKSB7XG4gICAgICBsaV9yb29tLmFkZENsYXNzKCdhY3RpdmVfcm9vbScpO1xuICAgIH1cbiAgICBcbiAgICBsaV9yb29tLmFwcGVuZChzcGFuX3Jvb20pLmFwcGVuZChzcGFuX251bSk7XG4gICAgcm9vbXNMaXN0LmFwcGVuZChsaV9yb29tKTtcbiAgfVxuICBub3cudGV4dChhY3RpdmUpO1xufSlcblxuLy8g55So5oi35Lq65pWwXG5zb2NrZXQub24oJ29ubGluZSBudW1iZXInLCBmdW5jdGlvbiAobnVtKSB7XG4gIG9ubGluZU51bS50ZXh0KG51bSlcbiAgb25saW5lTnVtLmF0dHIoJ3RpdGxlJywgYOaAu+WFsSR7bnVtfeS6uuWcqOe6v2ApXG59KVxuXG4vLyDmt7vliqDmiL/pl7RcbmFkZFJvb20uY2xpY2soZnVuY3Rpb24gKCkge1xuICBsZXQgcm9vbSA9IHByb21wdCgn6K+36L6T5YWl5oi/6Ze055qE5ZCN5a2XJyk7XG4gIGxldCBleGlzdCA9IGZhbHNlXG4gIHJvb20gPSByb29tID8gcm9vbS50cmltKCkgOiAnJztcbiAgXG4gIEFycmF5LmZyb20oJCgnLnJvb21zX2xpc3QgbGkgLnJvb20nKSkuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAoaXRlbS5pbm5lclRleHQgPT0gcm9vbSkge1xuICAgICAgZXhpc3QgPSB0cnVlO1xuICAgICAgYWxlcnQoJ+aIv+mXtOW3sue7j+WtmOWcqCcpO1xuICAgIH1cbiAgfSlcbiAgbGV0IHJvb21MZW4gPSBzdHJMZW4ocm9vbSk7XG5cbiAgaWYgKHJvb21MZW4gPiAyMCkge1xuICAgIGFsZXJ0KCfmiL/pl7TlkI3lrZfplb/luqbotoXov4cyMCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocm9vbUxlbiA+IDAgJiYgIWV4aXN0KSB7XG4gICAgLy8gJCgnLnJvb21zX2xpc3QgbGknKS5yZW1vdmVDbGFzcygnYWN0aXZlX3Jvb20nKTtcbiAgICAvLyByb29tc0xpc3QuYXBwZW5kKGA8bGkgY2xhc3M9XCJhY3RpdmVfcm9vbVwiPiR7cm9vbX08L2xpPmApO1xuICAgIFxuICAgIHNvY2tldC5lbWl0KCdhZGQgcm9vbScsIHJvb20pO1xuICAgIHNvY2tldC5lbWl0KCdjaGFuZ2Ugcm9vbScsIHJvb20pO1xuICB9XG59KVxuXG4vLyDliIfmjaLmiL/pl7RcbnJvb21zTGlzdC5jbGljayhmdW5jdGlvbiAoZSkge1xuICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnbGknKS5hdHRyKCdjbGFzcycpID09ICdhY3RpdmVfcm9vbScpIHJldHVybjtcbiAgXG4gIGxldCByb29tID0gJChlLnRhcmdldCkuY2xvc2VzdCgnbGknKS5kYXRhKCdyb29tJyk7XG5cbiAgaWYgKCFyb29tKSByZXR1cm47XG5cbiAgY29uc29sZS5sb2coJC5jb29raWUoJ25hbWUnKSArICcgdG8gJyArIHJvb20pO1xuXG4gIHNvY2tldC5lbWl0KCdjaGFuZ2Ugcm9vbScsIHJvb20pO1xuICAkKCcucm9vbXNfbGlzdCBsaScpLnJlbW92ZUNsYXNzKCdhY3RpdmVfcm9vbScpXG4gICQoZS50YXJnZXQpLmNsb3Nlc3QoJ2xpJykuYWRkQ2xhc3MoJ2FjdGl2ZV9yb29tJylcbn0pXG5cbi8vIOa4heWxj1xuY2xlYXJCdG4uY2xpY2soZnVuY3Rpb24gKCkge1xuICBtc2cuZW1wdHkoKTtcbn0pXG5cbi8vIOezu+e7n+a2iOaBr+mAmuefpVxuc29ja2V0Lm9uKCdzeXN0ZW0nLCBmdW5jdGlvbiAoaW5mbykge1xuICBsZXQgbGlfc3lzID0gJCgnPGxpIGNsYXNzPVwic3lzdGVtXCI+PC9saT4nKS50ZXh0KGluZm8pXG4gIG1zZy5hcHBlbmQobGlfc3lzKTtcbiAgbXNnLnNjcm9sbFRvcCg5OTk5OTk5OTk5OTk5KTtcbn0pXG5cbi8vIOWPkemAgea2iOaBr1xuc2VuZEJ0bi5jbGljayhzZW5kTXNnKVxuZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PSAxNykgY3RybCA9IHRydWU7XG59XG5kb2N1bWVudC5vbmtleXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PSAxNykgY3RybCA9IGZhbHNlO1xufVxuaW5mby5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG4gIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcbiAgICBpZiAoY3RybCkge1xuICAgICAgc2VuZE1zZygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCAnPGJyPjxicj4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pXG5cbnNvY2tldC5vbignc2VuZCBtc2cnLCBmdW5jdGlvbiAoaW5mbykge1xuICAvLyBtc2cuYXBwZW5kKGA8bGkgY2xhc3M9XCJpbmZvXCI+XG4gIC8vICAgPHAgY2xhc3M9XCJpbmZvX3VzZXIgb3RoZXJzX2luZm9fdXNlclwiPiR7aW5mby5uYW1lfTwvcD5cbiAgLy8gICA8cCBjbGFzcz1cImluZm9fY29udGVudCBvdGhlcnNfaW5mb19jb250ZW50XCI+JHtpbmZvLmNvbnRlbnR9PC9wPlxuICAvLyA8L2xpPmApXG4gIGxldCBsaV9pbmZvID0gJCgnPGxpIGNsYXNzPVwiaW5mb1wiPjwvbGk+Jyk7XG4gIGxldCBzcGFuX3RpbWUgPSAkKGA8c3BhbiBjbGFzcz1cImluZm9fdGltZSBvdGhlcnNfaW5mb190aW1lXCI+JHtpbmZvLnRpbWV9PC9zcGFuPmApXG4gIGxldCBwX3VzZXIgPSAkKCc8cCBjbGFzcz1cImluZm9fdXNlciBvdGhlcnNfaW5mb191c2VyXCI+PC9wPicpLnRleHQoaW5mby5uYW1lKS5hcHBlbmQoc3Bhbl90aW1lKTtcbiAgbGV0IHBfY29udGVudCA9ICQoJzxwIGNsYXNzPVwiaW5mb19jb250ZW50IG90aGVyc19pbmZvX2NvbnRlbnRcIj48L3A+JykudGV4dChpbmZvLmNvbnRlbnQpO1xuXG4gIGxpX2luZm8uYXBwZW5kKHBfdXNlcikuYXBwZW5kKHBfY29udGVudCk7XG4gIG1zZy5hcHBlbmQobGlfaW5mbyk7XG5cbiAgbXNnLnNjcm9sbFRvcCg5OTk5OTk5OTk5OTk5OSlcbn0pXG5cbmZ1bmN0aW9uIHNlbmRNc2cgKCkge1xuICBsZXQgY29udGVudCA9IGluZm8udGV4dCgpLnRyaW0oKTtcbiAgaWYgKCFjb250ZW50KSB7XG4gICAgYWxlcnQoJ+ivt+i+k+WFpeWGheWuuScpXG4gICAgcmV0dXJuO1xuICB9XG4gIGluZm8udGV4dCgnJykuZm9jdXMoKTtcbiAgc29ja2V0LmVtaXQoJ3NlbmQgbXNnJywgY29udGVudCk7XG5cbiAgLy8gbXNnLmFwcGVuZChgPGxpIGNsYXNzPVwiaW5mbyBtaW5lX2luZm9cIj5cbiAgLy8gICA8cCBjbGFzcz1cImluZm9fdXNlciBtaW5lX2luZm9fdXNlclwiPiR7JC5jb29raWUoJ25hbWUnKX08L3A+XG4gIC8vICAgPHAgY2xhc3M9XCJpbmZvX2NvbnRlbnQgbWluZV9pbmZvX2NvbnRlbnRcIj4ke2NvbnRlbnR9PC9wPlxuICAvLyA8L2xpPmApXG5cbiAgLy8gbXNnLmFwcGVuZCgkKGA8bGkgY2xhc3M9XCJpbmZvIG1pbmVfaW5mb1wiPlxuICAvLyAgIDxwIGNsYXNzPVwiaW5mb191c2VyIG1pbmVfaW5mb191c2VyXCI+JHskLmNvb2tpZSgnbmFtZScpfTwvcD5cbiAgLy8gPC9saT5gKS5hcHBlbmQoJCgnPHAgY2xhc3M9XCJpbmZvX2NvbnRlbnQgbWluZV9pbmZvX2NvbnRlbnRcIj48L3A+JykudGV4dChjb250ZW50KSkpXG4gIGxldCBsaV9pbmZvID0gJCgnPGxpIGNsYXNzPVwiaW5mbyBtaW5lX2luZm9cIj48L2xpPicpO1xuICBsZXQgc3Bhbl90aW1lID0gJChgPHNwYW4gY2xhc3M9XCJpbmZvX3RpbWUgbWluZV9pbmZvX3RpbWVcIj4ke2dldFRpbWUoKX08L3NwYW4+YClcbiAgbGV0IHBfdXNlciA9ICQoJzxwIGNsYXNzPVwiaW5mb191c2VyIG1pbmVfaW5mb191c2VyXCI+PC9wPicpLnRleHQoJC5jb29raWUoJ25hbWUnKSkucHJlcGVuZChzcGFuX3RpbWUpO1xuICBsZXQgcF9jb250ZW50ID0gJCgnPHAgY2xhc3M9XCJpbmZvX2NvbnRlbnQgbWluZV9pbmZvX2NvbnRlbnRcIj48L3A+JykudGV4dChjb250ZW50KTtcblxuICBsaV9pbmZvLmFwcGVuZChwX3VzZXIpLmFwcGVuZChwX2NvbnRlbnQpO1xuICBtc2cuYXBwZW5kKGxpX2luZm8pO1xuICBcbiAgbXNnLnNjcm9sbFRvcCg5OTk5OTk5OTk5OTk5OSlcbn1cblxuZnVuY3Rpb24gc3RyTGVuIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nLCAnMDAnKS5sZW5ndGhcbn1cblxuZnVuY3Rpb24gZ2V0VGltZSAoKSB7XG4gIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICBsZXQgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xuICBsZXQgbW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XG4gIGxldCBkYXRlID0gbm93LmdldERhdGUoKTtcbiAgbGV0IGhvdXIgPSBub3cuZ2V0SG91cnMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIDApO1xuICBsZXQgbWludXRlID0gbm93LmdldE1pbnV0ZXMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIDApO1xuICBsZXQgc2Vjb25kID0gbm93LmdldFNlY29uZHMoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsIDApO1xuXG4gIHJldHVybiB5ZWFyKycvJyttb250aCsnLycrZGF0ZSsnICcraG91cisnOicrbWludXRlKyc6JytzZWNvbmRcbn0iXX0=