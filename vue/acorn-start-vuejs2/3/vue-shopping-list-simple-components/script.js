var data = {
  items: [{ text: 'Bananas', checked: true }, { text: 'Apples', checked: false }],
  title: 'My Shopping List'
};

// 아이템 컴포넌트 추가
Vue.component('add-item-component', {
  template: '#add-item-template',
  data: function() {
    return {
      newItem: ''
    }
  },
  methods: {
    addItem: function () {
      var text;

      text = this.newItem.trim();
      if (text) {
        this.$emit('add', this.newItem);
        this.newItem = "";
      }
    }
  }
});

// 아이템 컴포넌트
Vue.component('item-component', {
  template: '#item-template',
  props: ['item']
});

// 아이템 목록 컴포넌트 
Vue.component('items-component', {
  template: '#items-template',
  props: ['items']
});

// 제목 컴포넌트 변경
Vue.component('change-title-component', {
  template: '#change-title-template',
  props: ['value'],
  methods: {
    onInput: function(event) {
      this.$emit('input', event.target.value);
    }
  }
});

new Vue({
  el: '#app',
  data: data,
  methods: {
    
  }
});
