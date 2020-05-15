//测试调用方法
let test = str => {
  alert(str)
}
// 普通数据的排序方法
function sortNumber(a, b) {
  return a - b
}
//数组对象方法排序:
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = ~~a[key]
    var y = ~~b[key]
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
        returnValue.push({dm: key, mc: data[key]});
    }
    return sortByKey(returnValue,'dm')
}
export default {
  test,
  sortNumber,
  sortByKey,
  arrayIndex,
  ToArray
}
