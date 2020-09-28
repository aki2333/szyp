//测试调用方法
let test = str => {
  alert(str)
}
// 普通数据的排序方法
function sortNumber(a, b) {
  return a - b
}
function cxSort(arr) {

  arr.forEach((item, index) => {
    if (item.py == 'cx') {
      arr.splice(index, 1);
      arr.unshift(item);
    }
  })
  return arr
}
//数组对象方法排序:
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}
function arrayIndex(arr, sx1, sx2, arrsx) {
  return new Promise((resolve) => {
    let getArr = []
    arr.forEach(item => {
      if (item[sx1]) {
        getArr.push(item[sx2])
      }
      if (item[arrsx].length != 0) {
        item[arrsx].forEach(item2 => {
          if (item2[sx1]) {
            getArr.push(item2[sx2])
          }
        });
      }
    });
    resolve(getArr)
  })
}
function ToArray(data) {
  var returnValue = new Array();
  for (var key in data) {
    returnValue.push({ dm: key, mc: data[key] });
  }
  return sortByKey(returnValue, 'dm')
}
function objCompare(obj1,obj2){
  for(var i in obj2){
    for(var j in obj1){
      if(j==i){
        if(Array.isArray(obj2[i])){//如果obj2是数组
          obj1[j] = [obj1[j]]
        }
        delete obj2[i]
      }
    }
  }
  return {obj1:obj1,obj2:obj2}
}
function getBroswerAndVersion() {
  // var os = navigator.platform;
  var userAgent = navigator.userAgent;
  var info = "";
  var tempArray = "";
  //判断浏览器版本
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isEdge = userAgent.toLowerCase().indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1);

  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else if (isIE) {

    var version = "";
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) { version = "IE7"; }
    else if (fIEVersion == 8) { version = "IE8"; }
    else if (fIEVersion == 9) { version = "IE9"; }
    else if (fIEVersion == 10) { version = "IE10"; }
    else { version = "0" }

    info += version;

  } else if (isEdge) {
    info += "Edge";
  } else if (isIE11) {
    info += "IE11";
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
    info += tempArray[3] + tempArray[1];
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
    info += tempArray[1] + tempArray[2];
  } else {
    info += "unknown";
  }
  return info;
}
// 【例子】
// format(1554889542170); // 2019-04-10
// format(1554889542170, 'yyyy/mm/dd hh:ii:ss'); // 2019/04/10 17:45:42
// format(1554889542170, 'yy/m/d hh:ii:ss'); // 19/4/10 17:45:42
// format(1554889542170, 'yyyy/mm/dd w'); // 2019/04/10 星期三
// format(1554889542170, 'mm/dd/yyyy'); // 04/10/2019
function format(time, format = 'yyyy-mm-dd'){
  const d = time ? new Date(time) : new Date();
  const t = (i) => { return (i < 10 ? '0' : '') + i };
 
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const weekday = d.getDay();
 
  return format.replace(/(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi, function(r) {
    switch (r.toUpperCase()) {
      case 'YY':
        return ('' + year).substr(2);
      case 'YYYY':
        return year;
      case 'M':
        return month;
      case 'MM':
        return t(month);
      case 'D':
        return day;
      case 'DD':
        return t(day);
      case 'H':
        return hour;
      case 'HH':
        return t(hour);
      case 'I':
        return minutes;
      case 'II':
        return t(minutes);
      case 'S':
        return seconds;
      case 'SS':
        return t(seconds);
      case 'W':
        return `星期${['日', '一', '二', '三', '四', '五', '六'][weekday]}`;
      case 'WW':
        return ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday];
    }
  });
}
  
export default {
  test,
  sortNumber,
  sortByKey,
  arrayIndex,
  ToArray,
  cxSort,
  getBroswerAndVersion,
  format,
  objCompare
}
