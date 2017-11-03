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

    // 返回上一页
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    })

    // 点击弹出删除
    var delId=location.search.substring(4);
    console.log(delId);
    $('.alarm').attr('href','alarmIndex.html?id='+delId)
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.className=='delete'){
            $('.click').css('display','block');
        }
        if(obj.className=='clickBottom clickRight'){
            $.ajax({
                url:'https://api.huayi-cloud.com/removeDevice?user='+sessionStorage.user+'&token='+sessionStorage.token+'&dev='+delId,
                // url:'http://106.14.1.61:9000/removeDevice?user='+sessionStorage.user+'&token='+sessionStorage.token+'&dev='+delId,
                contentType:"application/json",
                cache:false,
                type:'post',
                success:function (text) {
                    console.log(text);
                    if(text.errmsg=='success'){
                        location.href="../index.html";
                    }
                }
            })
        }
        if(obj.className=='clickBottom clickLeft'){
            $('.click').css('display','none');
        }
        if(obj.parentNode.nodeName=='LI'){
            console.log((obj.parentNode.getAttribute('sid')))
            location.href='history.html?'+obj.parentNode.getAttribute('sid')+delId;
        }
    });

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
                console.log(text);
                var str="";
                var str2="";
                for(var i=0;i<text.devices.length;i++) {
                    if(text.devices[i].deviceName==location.search.substring(4)){
                        var newNickName;
                        if(!text.devices[i].nickName){
                            newNickName=text.devices[i].deviceName;
                        }else{
                            newNickName=text.devices[i].nickName;
                        }
                        $('.clickTop span').html(newNickName);
                        str+=`<img src="../images/delete.png" alt="" class="delete">
        <h1>${newNickName}</h1>
        <h2>备注信息</h2>`
    str2+=`<ul>`;
                        if(!text.devices[i].sensors.length){
                            str2+=`<p class="empty">这个设备里还没有添加传感器!!!</p>`
                        }else{
                            var newSensors=arrSotr(text.devices[i].sensors);
                            for(var j=0;j<newSensors.length;j++){
                            if(newSensors[j].SID.substring(0,3)=='AIS'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0015_ups.png" alt="">
                    </div>
                    <div class="sensorValues">模拟量:</div>
                    <div class="sensorValues"><span class="value"></span><span>ug/m3</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='DIS'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/kgl.png" alt="">
                    </div>
                    <div class="sensorAlarm">开关量: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='TMP'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/wd.png" alt="">
                    </div>
                    <div class="sensorValues">温度:</div>
                    <div class="sensorValues"><span class="value"></span><span> °C</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='HMD'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/sd.png" alt="">
                    </div>
                    <div class="sensorValues">湿度:</div>
                    <div class="sensorValues"><span class="value"></span><span> %RH</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='THS'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0001_wsd.png" alt="">
                    </div>
                    <div class="sensorValues">湿度: <span class="value"></span><span> %RH</span></div>
                    <div class="sensorValues">温度: <span class="value"></span><span> °C</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='SMK'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0000_yg.png" alt="">
                    </div>
                    <div class="sensorAlarm">烟感: `
                    str2+=`<span style="color:limegreen">正常</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='LKS'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0017_ls.png" alt="">
                    </div>
                    <div class="sensorAlarm">水浸: `
                                str2+=`<span style="color:limegreen">正常</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='MGM'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0007_mc.png" alt="">
                    </div>
                    <div class="sensorAlarm">门磁: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='IFR'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0008_hw.png" alt="">
                    </div>
                    <div class="sensorAlarm">红外: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='PRM'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0006_zj.png" alt="">
                    </div>
                    <div class="sensorAlarm">周界: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='SHK'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0005_zd.png" alt="">
                    </div>
                    <div class="sensorAlarm">振动: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                            if(newSensors[j].SID.substring(0,3)=='ALM'){
                                str2+=`<li sid=${newSensors[j].SID}>
                    <img class="tu" src="../images/tu.png" alt="">
                    <div class="sensorName">${newSensors[j].Name}</div>
                    <div class="sensorImg">
                        <img src="../images/_0013_kgdy.png" alt="">
                    </div>
                    <div class="sensorAlarm">报警按钮: <span style="color:#2FC47D">打开</span></div>
                </li>`
                            }
                        }
                        }
                        str2+=`</ul>`;
                    }
                }
                $('.title').html(str);
                $('#scroller').html(str2);
                myScroll.refresh();

            }else if(text.status==505){
                sessionStorage.clear();
                location.href="login.html";
            }

            // 获取设备数据
            function recerve() {
                $.ajax({
                    url:'https://api.huayi-cloud.com/dataDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    // url:'http://106.14.1.61:9000/dataDevice?user='+sessionStorage.user+'&token='+sessionStorage.token,
                    contentType:"application/json",
                    cache:false,
                    type:'post',
                    data:JSON.stringify([delId]),
                    success:function (text) {
                        // console.log(text);
                        for( j in text.devices[delId].Data){
                            for(var p=0;p<$('li').length;p++) {
                                if ($('li').eq(p).attr('sid') == j) {
                                    if(j.substring(0,3)=='THS'){
                                        $('li').eq(p).children('.sensorValues').eq(0).find('.value').html(text.devices[delId].Data[j].HMD0);
                                        $('li').eq(p).children('.sensorValues').eq(1).find('.value').html(text.devices[delId].Data[j].TMP0);
                                    }else if(j.substring(0,3)=='SMK'||j.substring(0,3)=='LKS'){
                                        if (text.devices[delId].Data[j] == 0) {
                                            $('li').eq(p).find('span').html('正常').css('color', '#2FC47D')
                                        } else {
                                            $('li').eq(p).find('span').html('报警').css('color', 'red');
                                        }
                                    }else if(j.substring(0,3)=='IFR'||j.substring(0,3)=='PRM'||j.substring(0,3)=='SHK'||j.substring(0,3)=='ALM'||j.substring(0,3)=='MGM'){
                                        if (text.devices[delId].Data[j] == 0) {
                                            $('li').eq(p).find('span').html('打开').css('color', '#2FC47D')
                                        } else {
                                            $('li').eq(p).find('span').html('关闭').css('color', 'red');
                                        }
                                    }else{
                                        $('li').eq(p).children('.sensorValues').find('.value').html(text.devices[delId].Data[j]);
                                    }
                                }
                            }
                        }
                    }
                });
            }
            recerve();
            var tt=setInterval(recerve,10000);
        }
    });

});

/*
* 总 80000 -- 65165
* 泠泠套：3164+11300=14464
* 流觞套：1460+550+2580=4690
* 1级忽视纹饰(琢)：+570*15=8550
* 武器：(鬼) 8955
* 衣服：(蓝) 8647
* 护腕：(鬼) 7580
* 帽子：(鬼) 3574
* 手套：(蓝) 3014
* 腰带：(泠泠) 2154
* 鞋子：(蓝) 2579
* 左戒：(泠泠) 2119 ===3
* 右戒：(蓝) 1587
* 左镯：(泠泠) 2916 ===2
* 右镯：(蓝) 2130
* 项链：(蓝) 3159
* 挂饰：2286
* 护心镜：
*
* 缺10孔  -->  5700
* */