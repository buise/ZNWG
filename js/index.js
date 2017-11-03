/**
 * Created by Administrator on 2017/9/14.
 */
function loaded () {
    myScroll = new IScroll('#wrapper', {
        scrollX: true,
        freeScroll: true,
        click:true,
        checkDOMChanges:true
    });
}
$(document).ready(function () {

    if (typeof(sessionStorage.token)=="undefined"){
        location.href="view/login.html";
    }

    // 获取设备列表
    $.ajax({
        url:'https://api.huayi-cloud.com/listDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
        // url:'http://106.14.1.61:9000/listDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
        contentType:"application/json",
        cache:false,
        type:'post',
        success:function (text) {
            console.log(text);
            if(text.status==200){
                var str="";
                for(var i=0;i<text.devices.length;i++){ //第一次循环获取所有设备
                    str+=`<div class="content" dev=${text.devices[i].deviceName}>
                            <div class="title">
                                <img src="images/totop.png" alt="" onclick="$(this).parent().parent().prependTo($('#scroller'))">`;
                    // 判断是否设置昵称
                    if(!text.devices[i].nickName){
                        str+=`<a href="view/details.html?id=${text.devices[i].deviceName}" class="h1">
                        <div class="name">${text.devices[i].deviceName}</div>`
                    }else{
                        str+=`<a href="view/details.html?id=${text.devices[i].deviceName}" class="h1">
                         <div class="name">${text.devices[i].nickName}</div>`
                    }
                    str+=`<div class="online">
                                    <div class="status"></div>
                                    <div class="wd">在线</div>
</div>
<div class="offline">
                                    <div class="status">
                                    <div class="aa"></div>
</div>
                                    <div class="wd">离线</div>
</div>
                                    
                                </a>
                                <h2>备注信息</h2>
                            </div>
                            <ul>`;
                    if(!text.devices[i].sensors.length){
                        continue;
                    };
                    for(var j=0;j<text.devices[i].sensors.length;j++){ //第二次循环获取所有传感器
                        if(j==4){ //限制首页中每个设备最多只显示四个传感器
                            break;
                        }
                        var newSensors=arrSotr(text.devices[i].sensors);
                        str+=`<li sid=${newSensors[j].SID}>
                    <div class="sensorName">${newSensors[j].Name}</div>`;
                        if(newSensors[j].SID.substring(0,3)=='AIS'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0015_ups.png" alt="">
                    </div>
                    <div class="sensorValues">模拟量:</div>
                    <div class="sensorValues"><span class="value"></span><span>ug/m3</span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='DIS'){
                            str+=`<div class="sensorImg">
                        <img src="images/kgl.png" alt="">
                    </div>
                    <div class="sensorAlarm">开关量: <span style="color:#2FC47D">打开</span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='TMP'){
                            str+=`<div class="sensorImg">
                        <img src="images/wd.png" alt="">
                    </div>
                    <div class="sensorValues">温度:</div>
                    <div class="sensorValues"><span class="value"></span><span> °C</span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='HMD'){
                            str+=`<div class="sensorImg">
                        <img src="images/sd.png" alt="">
                    </div>
                    <div class="sensorValues">湿度:</div>
                    <div class="sensorValues"><span class="value"></span><span> %RH</span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='THS'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0001_wsd.png" alt="">
                    </div>
                    <div class="sensorValues" type="HMD0">湿度: <span class="value"></span><span> %RH</span></div>
                    <div class="sensorValues" type="TMP0">温度: <span class="value"></span><span> °C</span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='SMK'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0000_yg.png" alt="">
                    </div>
                    <div class="sensorAlarm">烟感: `;
                    str+=`<span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='LKS'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0017_ls.png" alt="">
                    </div>
                    <div class="sensorAlarm">水浸: `
                    str+=`<span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='MGM'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0007_mc.png" alt="">
                    </div>
                    <div class="sensorAlarm">门磁: <span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='IFR'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0008_hw.png" alt="">
                    </div>
                    <div class="sensorAlarm">红外: <span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='PRM'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0006_zj.png" alt="">
                    </div>
                    <div class="sensorAlarm">周界: <span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='SHK'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0005_zd.png" alt="">
                    </div>
                    <div class="sensorAlarm">振动: <span></span></div>
                </li>`
                        }
                        if(newSensors[j].SID.substring(0,3)=='ALM'){
                            str+=`<div class="sensorImg">
                        <img src="images/_0013_kgdy.png" alt="">
                    </div>
                    <div class="sensorAlarm">报警按钮: <span></span></div>
                </li>`
                        }
                    }
                    str+=`
                    </ul>
                    <div class="kong"></div>
                </div>`;

                }
                $('#scroller').prepend(str);
                myScroll.refresh();

            }else if(text.status==505){
                sessionStorage.clear();
                location.href="view/login.html";
            }


            // 获取设备数据
            function recerve() {
                var params=[];
                for(var k=0;k<$('.content').length;k++){
                    params.push($('.content').eq(k).attr('dev'));
                }
                $.ajax({
                    url:'https://api.huayi-cloud.com/dataDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    // url:'http://106.14.1.61:9000/dataDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    contentType:"application/json",
                    cache:false,
                    type:'post',
                    data:JSON.stringify(params),
                    success:function (text) {
                        console.log(text);
                        for(var q=0;q<$('.content').length;q++){
                            for( i in text.devices){
                                if(i==$('.content').eq(q).attr('dev')){
                                    for( j in text.devices[i].Data){
                                        for(var p=0;p<$('.content li').length;p++) {
                                            if ($('li').eq(p).attr('sid') == j) {
                                                if(j.substring(0,3)=='THS'){
                                                    $('li').eq(p).children('.sensorValues').eq(0).find('.value').html(text.devices[i].Data[j].HMD0);
                                                    $('li').eq(p).children('.sensorValues').eq(1).find('.value').html(text.devices[i].Data[j].TMP0);
                                                }else if(j.substring(0,3)=='SMK'||j.substring(0,3)=='LKS'){
                                                    if (text.devices[i].Data[j] == 0) {
                                                        $('li').eq(p).find('span').html('正常').css('color', '#2FC47D')
                                                    } else {
                                                        $('li').eq(p).find('span').html('报警').css('color', 'red');
                                                    }
                                                }else if(j.substring(0,3)=='IFR'||j.substring(0,3)=='PRM'||j.substring(0,3)=='SHK'||j.substring(0,3)=='ALM'||j.substring(0,3)=='MGM'){
                                                    if (text.devices[i].Data[j] == 0) {
                                                        $('li').eq(p).find('span').html('打开').css('color', '#2FC47D')
                                                    } else {
                                                        $('li').eq(p).find('span').html('关闭').css('color', 'red');
                                                    }
                                                }else{
                                                    $('li').eq(p).children('.sensorValues').find('.value').html(text.devices[i].Data[j]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
            recerve();
            var tt=setInterval(recerve,10000);

            // 获取是否在线
            function statusOk() {
                var arr=[];
                for(var k=0;k<$('.content').length;k++){
                    arr.push($('.content').eq(k).attr('dev'));
                }
                $.ajax({
                    url:'https://api.huayi-cloud.com/statusDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    // url:'http://106.14.1.61:9000/statusDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    contentType:"application/json",
                    cache:false,
                    type:'post',
                    data:JSON.stringify(arr),
                    success:function (text) {
                        console.log(text)
                        // $('.online').css('display','none');
                        // $('.offline').css('display','none');
                        for(var q=0;q<$('.content').length;q++){
                            for( i in text.devices){
                                if(i==($('.content').eq(q).attr('dev'))){
                                    $('.content').eq(q).find('.name').next().css('display','none');
                                    $('.content').eq(q).find('.'+text.devices[i]).css('display','block');
                                }
                            }
                        }
                    }
                })
            }
            statusOk();
            var ts=setInterval(statusOk,10000);

        }
    });

    // 搜索设备
    $(".search input").get(0).oninput=function () {
        var value=$('.search input').val();
        var reg = RegExp(value,'ig');
        for(var i=0;i<$('.h1').length;i++){
            if($('.h1').eq(i).children('.name').html().search(reg)>=0){
                $('.h1').eq(i).parent().parent().css('display','block');
            }
            if($('.h1').eq(i).children('.name').html().search(reg)<0){
                $('.h1').eq(i).parent().parent().css('display','none');
            }
        }
    };


    // 设置透传
    // var fenghao={
    //     flag:'open'
    // };
    // $.ajax({
    //     url: 'http://106.14.1.61:9000/ctrlDevice?user=' + sessionStorage.user + '&token=' + sessionStorage.token+'&device=PIDS1200A0F31201',
    //     contentType: "application/json",
    //     cache: false,
    //     type: 'post',
    //     data:JSON.stringify(fenghao),
    //     success: function (text) {
    //         console.log(text);
    //     }
    // })



});