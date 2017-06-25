// 캡슐화 3

var ArrCreate = function(arg) {
  var arr = [1, 2, 3];

  return {
    getArr: function() {
      return arr;
    }
  };
}

var obj = ArrCreate();
var arr = obj.getArr();
arr.push(5);
console.log(obj.getArr()); // (출력값) [ 1, 2, 3, 5]
