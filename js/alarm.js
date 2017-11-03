/**
 * Created by Administrator on 2017/9/16.
 */
$(document).ready(function () {
    // 点击后退
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });

    $.ajax({
        url:'http://106.14.1.61:9000//alarmEvent?user='+sessionStorage.user+'&token='+sessionStorage.token+'&device=PIDS1200A0F31201',
        contentType:"application/json",
        cache:false,
        type:'post',
        success:function (text) {
            console.log(text);
        }
    })
})