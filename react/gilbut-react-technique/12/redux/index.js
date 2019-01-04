// 12 - 2 - 2 액션과 액션 생성 함수
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const increment = (diff) => ({
  type: INCREMENT,
  diff: diff
});

const decrement = (diff) => ({
  type: DECREMENT,
  diff: diff
});

// 12 - 2 - 3 변화를 일으키는 함수, 리듀서
const inintialState = {
  number: 1,
  foo: 'bar',
  baz: 'qux'
};

function counter(state = inintialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        number: state.number + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - action.diff
      };
    default:
      return state;
  }
}

// 12 - 2 - 4 리덕스 스토어 생성
const { createStore } = Redux;

const store = createStore(counter);

// 12 - 2 - 5 구독
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// 12 - 2 - 6 dispatch로 액션 전달
store.dispatch(increment(1));
store.dispatch(decrement(5));
store.dispatch(increment(10));
