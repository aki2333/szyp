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
  return array.sort(function(a, b) {
    var x = ~~a[key]
    var y = ~~b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}

export default {
  test,
  sortNumber,
  sortByKey
}
