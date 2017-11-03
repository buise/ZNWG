/**
 * Created by Administrator on 2017/9/15.
 */
$(document).ready(function () {
    // 查看状态
    if (!(typeof(sessionStorage.token)=="undefined")){
        console.log(1);
        location.href="../index.html";
    }

    // 返回上一页
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });

    var flag=true;
    $('.send').click(function () {
        if(flag){
            flag=false;
            var tel=$('.tel').val();
            var time=new Date().getTime();
            var tele={
                "cellphone":tel
            };
            $.ajax({
                contentType:"application/json",
                cache:false,
                type:'post',
                url: 'https://api.huayi-cloud.com/sendForgetPasswordSMS?tm='+time,
                // url: 'http://106.14.1.61:9000/sendForgetPasswordSMS?tm='+time,
                data:JSON.stringify(tele),
                success:function (text) {
                    if(text.status==501){
                        flag=true;
                        alertBox("非法请求！")
                    }else if(text.status==502){
                        flag=true;
                        alertBox("手机号为空！")
                    }else if(text.status==503){
                        flag=true;
                        alertBox("手机号已被注册！","2")
                    }else if(text.status==200){
                        alertBox("验证码已发送至手机，请查收！","4.5")
                        var i=60;
                        $('.send').css('background','#aaa').html('重新发送('+i+')');
                        var tt=setInterval(function () {
                            i--;
                            if(i==0){
                                clearInterval(tt);
                                flag=true;
                                $('.send').css('background','#5ba2f2').html('获取验证码');
                            }else{
                                $('.send').css('background','#aaa').html('重新发送('+i+')');
                            }
                        },1000);
                    }
                }
            });
        }

    })
    $('.submit').click(function () {
        var tel=$('.tel').val();
        var code=$('.code-input').val();
        var data={
            "cellphone":tel,
            "sms":code,
        };
        $.ajax({
            contentType:"application/json",
            cache:false,
            type:'post',
            //https://api.huayi-cloud.com/changePassword
            url: 'https://api.huayi-cloud.com/checkSMS',
            // url: 'http://106.14.1.61:9000/checkSMS',
            data:JSON.stringify(data),
            success:function (text) {
                console.log(text)
                if(text.status==200){
                    location.href="backPass.html?cellphone="+tel+"&sms="+code;
                }else if(text.status==505){
                    alertBox("验证码错误！")
                }
            }
        });
    })
});