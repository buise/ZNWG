/**
 * Created by Administrator on 2017/9/16.
 */
$(document).ready(function () {
    // 点击后退
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });
})