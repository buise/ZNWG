/**
 * Created by Administrator on 2017/10/13.
 */
/**
 * Created by Administrator on 2017/9/16.
 */
$(document).ready(function () {
    // 点击后退
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });

    // 点击出现的选择时间段效果
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.className=="alarmTime"){
            $('.click').toggle();
        }
        // if(obj.parentNode.className=="option"){
        //     $('.loading').css('display','block');
        //     if(obj.className=="day"){
        //         var dayTime=new Date().getTime()-259200000;
        //         condition(dayTime);
        //         $('.click').css('display','none');
        //     }
        //     if(obj.className=="week"){
        //         var weekTime=new Date().getTime()-604800000;
        //         condition(weekTime);
        //         $('.click').css('display','none');
        //     }
        //     if(obj.className=="month"){
        //         var monthTime=new Date().getTime()-2592000000;
        //         condition(monthTime);
        //         $('.click').css('display','none');
        //     }
        //     if(obj.className=="sure"){
        //         if($('.start-input').val()&&$('.end-input').val()){
        //             var start=transdate($('.start-input').val());
        //             var end=transdate($('.end-input').val());
        //             if(start>end||end>new Date().getTime()){
        //                 $('.loading').css('display','none');
        //                 alertBox('查询错误')
        //             }else{
        //                 condition(start,end);
        //                 $('.click').css('display','none');
        //             }
        //         }else{
        //             $('.loading').css('display','none');
        //             alertBox('查询错误')
        //         }
        //     }
        // }
    });

    // 判断当页传感器的类型
    var delId=location.search.substr(1,7);
    var devId=location.search.substr(8);
    var sensorArr1=['THS'], //双值
        sensorArr2=['AIS','TMP','HMD'], //单值
        sensorArr3=['SMK','LKS'], //报警
        sensorArr4=['DIS','MGM','IFR','PRM','SHK','ALM']; //开关
    var sensorString=delId.substring(0,3);
    var flag='';
    if(sensorArr1.indexOf(sensorString)>=0){
        flag='doubleValue'
    }else if(sensorArr2.indexOf(sensorString)>=0){
        flag='singleValue'
    }else if(sensorArr3.indexOf(sensorString)>=0){
        flag='alarmValue'
    }else if(sensorArr4.indexOf(sensorString)>=0){
        flag='flagValue'
    }
    console.log(flag);

    // 传感器类型分类
    sensorType={
        AIS:"模拟量",
        DIS:"开关量",
        TMP:"温度",
        HMD:"湿度",
        THS:"温湿度",
        SMK:"烟感",
        LKS:"水浸",
        MGM:"门磁",
        IFR:"红外",
        PRM:"周界",
        SHK:"振动",
        ALM:"报警按钮",
    };
    sensorName=sensorType[sensorString];
    console.log(sensorName);
    $('header h1').html(sensorName+'历史记录');

    // 点击出现的选择时间段效果
    var endA=Math.floor(new Date().getTime()/1000);
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.className=="alarm"){
            $('.click').toggle();
        }
        if(obj.parentNode.className=="option"){
            $('.loading').css('display','block');
            if(obj.className=="day"){
                var dayTime=Math.floor(new Date().getTime()/1000-259200);
                historyData(devId,delId,3600*3,dayTime,endA);
                $('.click').css('display','none');
            }
            if(obj.className=="week"){
                var weekTime=Math.floor(new Date().getTime()/1000-604800);
                historyData(devId,delId,3600*6,weekTime,endA);
                $('.click').css('display','none');
            }
            if(obj.className=="month"){
                var monthTime=Math.floor(new Date().getTime()/1000-2592000);
                historyData(devId,delId,3600*12,monthTime,endA);
                $('.click').css('display','none');
            }
            if(obj.className=="sure"){
                if($('.start-input').val()&&$('.end-input').val()){
                    var start=transdate($('.start-input').val())/1000;
                    var end=transdate($('.end-input').val())/1000;
                    if(start>end||end>new Date().getTime()){
                        $('.loading').css('display','none');
                        alertBox('查询错误')
                    }else{
                        var intIndex=Math.ceil((end-start)/86400*3600);
                        if((end-start)/86400<0.25){
                            intIndex=900;
                        }
                        historyData(devId,delId,intIndex,start,end);
                        $('.click').css('display','none');
                    }
                }else{
                    $('.loading').css('display','none');
                    alertBox('查询错误')
                }
            }
        }
    });

    // 历史数据
    var startA=Math.floor(new Date().getTime()/1000-3600);
    historyData(devId,delId,300,startA,endA);
    function historyData( devId, delId, interval, start, end) {
        $.ajax({
            url: 'https://api.huayi-cloud.com/historyData?user=' + sessionStorage.user + '&token=' + sessionStorage.token+'&device='+devId+'&start='+start+'&end='+end+'&interval='+interval,
            // url: 'http://106.14.1.61:9000/historyData?user=' + sessionStorage.user + '&token=' + sessionStorage.token+'&device='+devId+'&start='+start+'&end='+end+'&interval='+interval,
            contentType: "application/json",
            cache: false,
            type: 'post',
            success: function (text) {
                console.log(text);
                $('.loading').css('display','none');
                var arr1=[];
                var arr2=[];
                var brr=[];
                if(flag=='doubleValue'){
                    for(var i in text.data){
                        if(i==delId){
                            arr1=objKandV(text.data[i].HMD0,'v');
                            arr2=objKandV(text.data[i].TMP0,'v');
                            brr=objKandV(text.data[i].HMD0,'k',false);
                            console.log(brr);
                        }
                    }
                    console.log(arr1,arr2,brr)

                    var myChart = echarts.init(document.getElementById('main'));

                    // 指定图表的配置项和数据
                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['湿度']
                        },
                        toolbox: {          //可视化的工具箱
                            show: false,
                            feature: {
                                dataView: { //数据视图
                                    show: false
                                },
                                restore: {  //重置
                                    show: true
                                },
                                dataZoom: { //数据缩放视图
                                    show: true
                                },
                                saveAsImage: {//保存图片
                                    show: true
                                }
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: brr,
                            // axisLabel:{
                            //     interval:10,
                            // }
                        },
                        yAxis: {
                            name:'湿度 / %HR',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            min:findFive(arr1,'s',1),
                            max:findFive(arr1,'b',1)
                        },
                        series: [
                            {
                                name:'湿度',
                                type:'line',
                                data:arr1,
                            }
                        ]
                    };
                    $('#mainCopy').css('display','block');
                    var myChart2 = echarts.init(document.getElementById('mainCopy'));
                    option2 = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['温度']
                        },
                        toolbox: {              //可视化的工具箱
                            show: false,
                            feature: {
                                dataView: {     //数据视图
                                    show: false
                                },
                                restore: {      //重置
                                    show: true
                                },
                                dataZoom: {     //数据缩放视图
                                    show: true
                                },
                                saveAsImage: {  //保存图片
                                    show: true
                                }
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: brr,
                            // axisLabel:{
                            //     interval:10,
                            // }
                        },
                        yAxis: {
                            name:'温度 / °C',
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            },
                            min:findFive(arr2,'s',0),
                            max:findFive(arr2,'b',0)
                        },
                        series: [
                            {
                                name:'温度',
                                type:'line',
                                data:arr2,
                            }
                        ]
                    };
                    myChart2.setOption(option2);
                }else if(flag=='singleValue'){
                    for(var i=0;i<text.data.length;i++){
                        arr1.push(text.data[i].Data[delId]);
                        brr.push(setTime(text.data[i].Time*1000,'rAll'));
                    }
                    arr1=arr1.reverse();
                    brr=brr.reverse();

                    var myChart = echarts.init(document.getElementById('mainCopy'));
                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:[sensorName]
                        },
                        toolbox: {          //可视化的工具箱
                            show: false,
                            feature: {
                                dataView: { //数据视图
                                    show: false
                                },
                                restore: {  //重置
                                    show: true
                                },
                                dataZoom: { //数据缩放视图
                                    show: true
                                },
                                saveAsImage: {//保存图片
                                    show: true
                                }
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: brr,
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C'
                            },
                            min:66,
                            inside:false
                        },
                        series: [
                            {
                                name:'温度',
                                type:'line',
                                data:arr1,
                            }
                        ]
                    };
                }else{
                    $('#mainCopy').css('height','4rem');
                    var yAxisArr=[];
                    if(flag=='alarmValue'){
                        yAxisArr=['正常','报警']
                    }else if(flag=='flagValue'){
                        yAxisArr=['打开','关闭']
                    }
                    for(var i in text.data){
                        if(i==delId){
                            arr1=objKandV(text.data[i],'v');
                            brr=objKandV(text.data[i],'k',false);
                            console.log(arr1,brr);
                        }
                    }

                    var myChart = echarts.init(document.getElementById('mainCopy'));
                    option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:[sensorName]
                        },
                        toolbox: {          //可视化的工具箱
                            show: false,
                            feature: {
                                dataView: { //数据视图
                                    show: false
                                },
                                restore: {  //重置
                                    show: true
                                },
                                dataZoom: { //数据缩放视图
                                    show: true
                                },
                                saveAsImage: {//保存图片
                                    show: true
                                }
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: brr,
                            boundaryGap: false,
                        },
                        yAxis: [
                            {
                                type: 'category',
                                data:yAxisArr
                            }
                        ],
                        series: [
                            {
                                name:sensorName,
                                type:'line',
                                step: 'start',
                                data:arr1
                            },
                        ]
                    };
                }
                myChart.setOption(option);
            }
        });
    }
});