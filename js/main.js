/**
 * Created by Administrator on 2017/9/13.
 */
// 公用弹出框
function alertBox(str,width='2.29') {
    $("<div class='alert'>").appendTo('body');
    $('.alert').css({
        width:width+'rem',
        height:'0.8rem',
        background:'#5d5d5d',
        position:'absolute',
        left:'50%',
        bottom:'0',
        marginLeft:'-'+width/2+'rem',
        opacity:'0',
        borderRadius:'0.2rem',
        textAlign:'center',
        lineHeight:'0.8rem',
        fontSize:'0.24rem',
        color:'#fffefe',
        zIndex:'10000'
    }).html(str).animate({opacity:'1',bottom:'1.4rem'},300);
    $('.alert').animate({opacity:'0'},2000);
    setTimeout(function () {
        $('.alert').remove();
    },1500)
}

// 判断一个对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

// 格式化时间
function add0(m){
    return m<10?'0'+m:m
}
function setTime(number,type='all') {
    var time = new Date(number);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if(type=='all'){
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }else if(type=='l'){
        return y+'-'+add0(m)+'-'+add0(d);
    }else if(type=='r'){
        return add0(h)+':'+add0(mm);
    }else if(type=='rAll'){
        return add0(h)+':'+add0(mm)+':'+add0(s);
    }

}

function transdate(endTime){
    var date=new Date();
    date.setFullYear(endTime.substring(0,4));
    date.setMonth(endTime.substring(5,7)-1);
    date.setDate(endTime.substring(8,10));
    date.setHours(endTime.substring(11,13));
    date.setMinutes(endTime.substring(14,16));
    date.setSeconds(endTime.substring(17,19));
    return Date.parse(date);
}

// 获取一个数组里比最小值小的最大的5的倍数&&获取一个数组里比最大值大的最小的5的倍数
function findFive(arr,type,n=0) {
    var small=arr[0],big=arr[0];
    if(type=='s'){
        for(var i=1;i<arr.length;i++){
            if(small>arr[i]){
                small=arr[i];
            }
        }
        small=Math.floor(small);
        return small-n;
    }
    if(type=='b'){
        for(var i=1;i<arr.length;i++){
            if(big<arr[i]){
                big=arr[i];
            }
        }
        big=Math.ceil(big);
        return big+n;
    }
}

// 分别获取一个对象的键与值
function objKandV(objBox, type ,time=true) {
    var arr=[];
    for (var j=0;j<objBox.length;j++){
        if(type=='k'){
            for(var i in objBox[j]){
                arr.push(i);
            }
        }
        if(type=='v'){
            for(var i in objBox[j]){
                arr.push(objBox[j][i]);
            }
        }
    }
    if(time){
        return arr;
    }else{
        var brr=[];
        for(var i=0;i<arr.length;i++){
            brr.push(setTime(arr[i]*1000,'r'))
            // brr.push(setTime(arr[i]*1000))
        }
        return brr;
    }

}

// 数组按照一定的格式来排序
function arrSotr(arr) {
    var brr=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='AIS'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='DIS'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='TMP'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='HMP'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='THS'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='SMK'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='LKS'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='MGM'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='IFR'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='PRM'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='SHK'){
            brr.push(arr[i])
        }
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i].SID.substring(0,3)=='ALM'){
            brr.push(arr[i])
        }
    }
    return brr;
}