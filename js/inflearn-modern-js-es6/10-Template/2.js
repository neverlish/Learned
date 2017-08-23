// 10 Template - 2 Tagged Template literals

const data = [
  {
    name: 'coffee-bean',
    order: true,
    items: ['americano', 'milk', 'green-tea']
  },
  {
    name: 'starbucks',
    order: false
  },
  {
    name: 'coffee-king',
    order: false,
    items: ['americano', 'latte']
  }
];

function fn(tags, name, items) {
  if (typeof items == 'undefined') {
    items = '<span style="color:red">주문가능한 상품이 없습니다.</span>';
  }
  return (tags[0] + name + tags[1] + items + tags[2]);
}

const template = fn`<div>welcome ${data[0].name} !!</div>
  <h2>주문가능항목</h2><div>${data[1].items}</div>`;

console.log(template);

///////

data.forEach((v) => {
  let template2 = fn`<div>welcome ${v.name} !!</div>
    <h2>주문가능항목</h2><div>${v.items}</div>`;
  document.querySelector('#message').innerHTML += template2;
  // console.log(template2);
});
