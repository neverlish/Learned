// 할일 #1
// sibling-component 를 이름으로 갖는 새로운 컴포넌트를 아래에 등록해보세요.
// options : template, props
Vue.component('sibling-component', {
  props: ['passedMessage'],
  template: '<p>{{passedMessage}}</p>'
})

Vue.component('child-component', {
  props: ['passedData'],
  template: '<p>{{passedData}}</p>'
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue! passed from Parent Component',
    // 할일 #2
    // data 속성을 한개 더 지정하고 (예, anotherMessage) 임의의 문자열을 값으로 대입해보세요.
    // 새로 지정한 data 속성을 위 sibling-component 에 props 로 전달합니다.
    anotherMessage: 'Hello Sibling! passed from Parent Component'
  }
});
