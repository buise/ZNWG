/**
 * Created by Administrator on 2017/9/15.
 */
$(document).ready(function () {
    var flag=-1;
    // 查看状态
    if (!(typeof(sessionStorage.token)=="undefined")){
        console.log(1);
        location.href="../index.html";
    }

    // 显示上次登录的账号密码
    if (!(typeof(localStorage.login)=="undefined")){
        $('input[name=username]').val(localStorage.name);
        $('input[name=password]').val(localStorage.pass);
    }

    if(localStorage.login=='true'){
        flag=1;
        $('.remSmall').show();
    }else{
        flag=-1;
        $('.remSmall').hide();
    };


    // 点击登录
    $('.login').click(function () {
        var username=$('input[name=username]').val();
        var password=$('input[name=password]').val();
        $.ajax({
            contentType:"application/json",
            cache:false,
            type:'post',
            url: 'https://api.huayi-cloud.com/login?user='+username+'&passwd='+password,
            // url: 'http://106.14.1.61:9000/login?user='+username+'&passwd='+password,
            success:function (text) {
                console.log(text);
                if(text.status==503){
                    alertBox("密码错误！")
                }else if(text.status==502){
                    alertBox("用户不存在！")
                }else if(text.status==501){
                    alertBox("用户名或者密码为空！","3")
                }else if(text.result=='success'){
                    sessionStorage.token=text.login.token;
                    sessionStorage.user=text.login.user;
                    localStorage.name=username;
                    if(flag==1){
                        localStorage.pass=password;
                        localStorage.login=true;
                    }else if(flag==-1){
                        localStorage.pass='';
                        localStorage.login=false;
                    }
                    location.href="../index.html";
                }
            }
        });
    });

    // 记住密码
    $('.remember').children().click(function () {
        flag*=-1;
        $('.remSmall').toggle();
    })
});