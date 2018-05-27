/*
Vue.directive('my-directive', {
  bind: function() {
    // 엘리먼트가 바인딩될 때 예비 작업들을 한다
  },
  update: function(newValue, oldValue) {
    // 갱신된 값으로 어떤 자업을 수행한다
  },
  unbind: function() {
    // 클린업 작업을 한다
  }
})
*/

Vue.directive('square', function(el, binding) {
  el.innerHTML = Math.pow(binding.value, 2);
});

new Vue({
  el: '#app',
  data: { item: 42 }
})
