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
            var telephone=$('input[name=tel]').val();
            var tele={
                "cellphone":telephone
            };
            var time=new Date().getTime();
            console.log(tele);
            $.ajax({
                type:'post',
                url: 'https://api.huayi-cloud.com/sendRegisterSMS?tm='+time,
                // url: 'http://106.14.1.61:9000/sendRegisterSMS?tm='+time,
                contentType:"application/json",
                cache:false,
                data:JSON.stringify(tele),
                success:function (text) {
                    console.log(text);
                    if(text.status==501){
                        flag=true;
                        alertBox("非法请求");
                    }else if(text.status==502){
                        flag=true;
                        alertBox("请输入要绑定的手机号","3");
                    }else if(text.status==503){
                        flag=true;
                        alertBox("手机号已被注册","2.5");
                    }else if(text.status==200){
                        alertBox("验证码已发送至手机，请查收！","4.5");
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
    });
    $('.submit').click(function () {
        var code=$('input[name=code]').val();
        var password=$('input[name=password]').val();
        var password2=$('input[name=password2]').val();
        var telephone=$('input[name=tel]').val();
        var username=$('input[name=username]').val();
        var email=$('input[name=email]').val();
        var address=$('input[name=address]').val();
        var company=$('input[name=company]').val();
        if(password==password2){
            var params={
                "cellphone":telephone,
                "sms":code,
                "password":password,
                "username":username,
                "email":email,
                "address":address,
                "company":company
            };
            $.ajax({
                type:'post',
                url: 'https://api.huayi-cloud.com/register',
                // url: 'http://106.14.1.61:9000/register',
                contentType:"application/json",
                cache:false,
                data:JSON.stringify(params),
                success:function (text) {
                    console.log(text);
                    if(text.status==501){
                        alertBox("非法请求");
                    }else if(text.status==502){
                        alertBox("用户为空");
                    }else if(text.status==503){
                        alertBox("密码为空");
                    }else if(text.status==504){
                        alertBox("用户名已被注册","2");
                    }else if(text.status==505){
                        alertBox("验证码错误","2");
                    }else if(text.status==200){
                        location.href='login.html';
                    }
                }
            });
        }else{
            alertBox('两次密码输入不同','2.5')
        }
    })
})