/**
 * Created by Administrator on 2017/9/14.
 */
$(document).ready(function () {
    // 返回上一页
    console.log(sessionStorage.user)
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });

    // 点击输入设备ID
    $('.addCode').click(function () {
        $('.clickTop').val('');
        $('.click').show();
    });
    $('.clickRight').click(function () {
        $('.click').hide();
    });
    
    // 添加设备
    $('.clickLeft').click(function () {
        var idcard=$('.clickTop').val();
        $.ajax({
            // url:'https://api.huayi-cloud.com/addDevice?user='+sessionStorage.user+'&token='+sessionStorage.token+'&dev=PIDS1200C1F31200',
            url:'http://106.14.1.61:9000/addDevice?user='+sessionStorage.user+'&token='+sessionStorage.token+'&dev='+idcard,
            contentType:"application/json",
            cache:false,
            type:'post',
            success:function (text) {
                console.log(text);
                if(text.status=="200"){
                    location.href="../index.html";
                }else if(text.status=="503"){
                    alertBox("设备不存在",'2.5');
                }else if(text.status=="504"){
                    alertBox("设备已经在设备列表中",'3.5');
                }else if(text.status=="505") {
                    alertBox("账号有误，请重新登录", '3.5');
                }
            }
        })
    })
});
