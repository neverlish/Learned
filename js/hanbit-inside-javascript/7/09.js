// bind

var print_all = function(arg) {
  for (var i in this) console.log(i + ' : ' + this[i]);
  for (var i in arguments) console.log(i + ' : ' + arguments[i]);
}

var myobj = { name: 'zzoon' };

var myfunc = print_all.bind(myobj);
myfunc(); // "name : zzoon" 출력

var myfunc1 = print_all.bind(myobj, 'iamhjoo', 'others');
myfunc1('insidejs');

/* 다음을 출력한다
name : zzoon
0 : iamhjoo
1 : others
2 : insidejs
*/
