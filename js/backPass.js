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

    // 查看密码
    $('.inputBox img').click(function () {
        if($('.pass').attr('type')=='password'){
            $('.pass').attr('type','text');
        }else{
            $('.pass').attr('type','password');
        }
    })


    // 确认修改
    $('.submit').click(function () {
        var pass=$('.pass').val();
        var pass2=$('.pass2').val();
        if(pass==pass2){
            if(pass){
                var tel=location.search.substring(11,22);
                var code=location.search.substring(27,31);
                var data={
                    "cellphone":tel,
                    "sms":code,
                    "password":pass
                };
                console.log(data);
                $.ajax({
                    contentType:"application/json",
                    cache:false,
                    type:'post',
                    // url: 'http://106.14.1.61:9000/changePassword',
                    url: 'https://api.huayi-cloud.com/changePassword',
                    data:JSON.stringify(data),
                    success:function (text) {
                        console.log(text);
                        location.href='login.html';
                    }
                });
            }else{
                alertBox('密码不能为空')
            }
        }else{
            alertBox('两次密码不同')
        }
    })
})