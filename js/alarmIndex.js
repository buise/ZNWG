/**
 * Created by Administrator on 2017/9/16.
 */
$(document).ready(function () {
    // 点击后退
    var back=document.querySelector('.imgBox');
    back.addEventListener('touchstart',function () {
        window.history.go(-1);
    });
    var delId=location.search.substring(4);
    console.log(delId);


    //该设备原本的报警记录查询
    var index=0;
    function some(n) {
        $.ajax({
            url:'http://106.14.1.61:9000//alarmEvent?user='+sessionStorage.user+'&token='+sessionStorage.token+'&device='+delId+'&pn='+n,
            contentType:"application/json",
            cache:false,
            type:'post',
            success:function (text) {
                console.log(text);
                if(index){
                    $('tr').last().remove();
                }
                var str='';
                if(!text.events.length){
                    str+=`<tr><td colspan="3"><p style="color:#999">本设备暂无报警信息</p></td></tr>`;
                }else{
                    for(var i=0;i<text.events.length;i++){

                        var time=text.events[i].Time*1000;
                        str+=`<tr class="alarmTitleBox">
                <td class="alarmTitle">${text.events[i].Alarm.Title}</td>`
                        if(text.events[i].Status=='OFF'){
                            str+=`<td class="flag" style="color:#00a44f">解除</td>`
                        }else{
                            str+=`<td class="flag" style="color:#e83828">报警</td>`
                        }
                        str+=`<td>
                    <div class="time">${setTime(time,'r')}</div>
                    <div class="data">${setTime(time,'l')}</div>
                </td>
            </tr>
            <tr class="alarmContent">
            <td colspan="3">${text.events[i].Alarm.Event}</td>
</tr>
`
                    }
                    str+=`<tr><td colspan="3"><p>查看更多</p></td></tr>`;
                    index++;
                }
                $('.content').append(str);
                myScroll.refresh();
            }
        })
    }
    some(index);
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.nodeName=="P"){
            some(index);
        }
    });


    // 点击出现的选择时间段效果
    $(document).click(function (e) {
        var obj=e.target;
        if(obj.className=="alarmTime"){
            $('.click').toggle();
        }
        if(obj.parentNode.className=="option"){
            $('.loading').css('display','block');
            if(obj.className=="day"){
                var dayTime=new Date().getTime()-259200000;
                condition(dayTime);
                $('.click').css('display','none');
            }
            if(obj.className=="week"){
                var weekTime=new Date().getTime()-604800000;
                condition(weekTime);
                $('.click').css('display','none');
            }
            if(obj.className=="month"){
                var monthTime=new Date().getTime()-2592000000;
                condition(monthTime);
                $('.click').css('display','none');
            }
            if(obj.className=="sure"){
                if($('.start-input').val()&&$('.end-input').val()){
                    var start=transdate($('.start-input').val());
                    var end=transdate($('.end-input').val());
                    if(start>end||end>new Date().getTime()){
                        $('.loading').css('display','none');
                        alertBox('查询错误')
                    }else{
                        condition(start,end);
                        $('.click').css('display','none');
                    }
                }else{
                    $('.loading').css('display','none');
                    alertBox('查询错误')
                }
            }
        }
    });
    
    // 封装条件查询报警信息函数
    function condition(start,end=new Date().getTime(),index=0,string="") {
        $.ajax({
            url:'http://106.14.1.61:9000//alarmEvent?user='+sessionStorage.user+'&token='+sessionStorage.token+'&device='+delId+'&pn='+index,
            contentType:"application/json",
            cache:false,
            type:'post',
            success:function (text) {
                for(var i=0;i<text.events.length;i++){
                    var time=text.events[i].Time*1000;
                    if(time>=start&&time<=end){
                        string+=`<tr class="alarmTitleBox">
                <td class="alarmTitle">${text.events[i].Alarm.Title}</td>`
                        if(text.events[i].Status=='OFF'){
                            string+=`<td class="flag" style="color:#00a44f">解除</td>`
                        }else{
                            string+=`<td class="flag" style="color:#e83828">报警</td>`
                        }
                        string+=`<td>
                    <div class="time">${setTime(time,'r')}</div>
                    <div class="data">${setTime(time,'l')}</div>
                </td>
            </tr>
            <tr class="alarmContent">
            <td colspan="3">${text.events[i].Alarm.Event}</td>
</tr>`
                    }
                }
                if(text.events.length<20){
                    if(string==''){
                        string+=`<tr><td colspan="3"><p style="color:#999">该时间段内暂无报警信息</p></td></tr>`;
                    }
                    $('.content').html(string);
                    $('.loading').css('display','none');
                    myScroll.refresh();
                }else{
                    condition(start,end,index=index+1,string);
                }
            }
        })
    }

    $(document).click(function (e) {
        var obj=e.target;
        if($(obj).parents('.alarmTitleBox').length){
            $(obj).parents('.alarmTitleBox').eq(0).next().toggle();
            myScroll.refresh();
        }
    })
});