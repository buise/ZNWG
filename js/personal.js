/**
 * Created by Administrator on 2017/9/15.
 */
$(document).ready(function () {
    // 点击后退
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });

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
                $('.titleBox h1').html(text.nickname);
                $('.imgBox2 img').attr('src',text.profilePhoto);
                $('.gender').html(text.gender);
                $('input[name=username]').val(text.nickname);
                $('input[name=age]').val(text.age);
                $('input[name=email]').val(text.email);
                $('input[name=cellphone]').val(text.cellphone);
                $('input[name=address]').val(text.address);
                $('input[name=company]').val(text.company);
                $('input[name=signature]').val(text.signature);
            }
        }
    });

    // 更换头像
    $("input[name=imageFile]").change(function () {
        var file=Array.prototype.slice.call(this.files);
        let read=new FileReader();
        read.readAsDataURL(file[0]);
        read.onload=function (e) {
            $(".imgBox2 img").attr('src',e.target.result);
        };
        var formData = new FormData();
        var files=$("input[name=imageFile]")[0].files[0];
        formData.append('imageFile',files);
        $.ajax({
            type:'post',
            url: 'https://api.huayi-cloud.com/uploadPhoto?user='+sessionStorage.user+'&token='+sessionStorage.token,
            // url: 'http://106.14.1.61:9000/uploadPhoto?user='+sessionStorage.user+'&token='+sessionStorage.token,
            contentType:false,
            cache:false,
            processData:false,
            data: formData,
            error:function () {
                alertBox("图片过大");
            },
            success:function (text) {
                console.log(text);
                if(text.status="200"){
                    alertBox("上传成功");
                }else{
                    alertBox("上传失败");
                }
            }
        });
    });

    // 点击更改个人信息
    $('header h2').click(function () {
        var gender=$('.gender').html();
        var nickname=$('input[name=username]').val();
        var age=$('input[name=age]').val();
        var email=$('input[name=email]').val();
        var cellphone=$('input[name=cellphone]').val();
        var address=$('input[name=address]').val();
        var company=$('input[name=company]').val();
        var signature=$('input[name=signature]').val();
        var params={
            gender:gender,
            nickname:nickname,
            age:age,
            email:email,
            cellphone:cellphone,
            address:address,
            company:company,
            signature:signature,
        }
        console.log(params);
        $.ajax({
            type:'post',
            url: 'https://api.huayi-cloud.com/update?user='+sessionStorage.user+'&token='+sessionStorage.token,
            // url: 'http://106.14.1.61:9000/update?user='+sessionStorage.user+'&token='+sessionStorage.token,
            contentType:"application/json",
            cache:false,
            data:JSON.stringify(params),
            success:function (text) {
                if(text.status="200"){
                    alertBox('保存成功')
                }else{
                    alertBox("账号有误，请重新登录",'3.5');
                }
            }
        });
    })

    // 关于性别的修改
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.className=='gender'){
            $('.clickBox').css('display','block');
        }
        if(obj.className=='clickCancel'){
            $('.clickBox').css('display','none');
        }
    });
    $('.clickOption li').click(function () {
        $('.gender').html($(this).html());
        $('.clickBox').css('display','none');
    });
});