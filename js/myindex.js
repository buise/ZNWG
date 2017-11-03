/**
 * Created by Administrator on 2017/9/15.
 */
$(document).ready(function () {

    // 判断此时的登录状态
    if (typeof(sessionStorage.token)=="undefined"){
        location.href="login.html";
    }

    // 获取信息
    $.ajax({
        type:'post',
        url: 'https://api.huayi-cloud.com/userInfo?user='+sessionStorage.user+'&token='+sessionStorage.token,
        // url: 'http://106.14.1.61:9000/userInfo?user='+sessionStorage.user+'&token='+sessionStorage.token,
        contentType:"application/json",
        cache:false,
        success:function (text) {
            console.log(text);
            if(text.status==200){
                $('.personal img').attr('src',text.profilePhoto);
                $('.personal h3').html(text.nickname);
                $('.personal h4').html(text.email);
            }else if(text.status==505){
                sessionStorage.clear();
                location.href="login.html";
            }
        }
    });

    // 退出登录
    $('#exit').click(function (){
        sessionStorage.clear();
        location.href='login.html';
    })
});