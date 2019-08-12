import React from 'react';

export default class MyComponent extends React.Component {
  state = { desc: '', currentId: 1, todoList: [] };
  onAdd = () => {
    const { desc, currentId, todoList } = this.state;
    const todo = { id: currentId, desc };
    this.setState({
      currentId: currentId + 1,
      todoList: [...todoList, todo],
    });
  };
  onDelete = e => {
    const { todoList } = this.state;
    const id = Number(e.target.dataset.id);
    const newTodoList = todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: newTodoList });
  };
  onSaveToServer = () => {
    // todoList 전송
  };
  onChangeDesc = e => {
    const desc = e.target.value;
    this.setState({ desc });
  };
  render() {
    const { desc, todoList } = this.state;
    return (
      <div>
        <h3>할 일 목록</h3>
        <ul>
          {todoList.map(todo => (
            <li key={todo.id}>
              <span>{todo.desc}</span>
              <button data-id={todo.id} onClick={this.onDelete}>
                삭제
              </button>
            </li>
          ))}
        </ul>
        <input type='text' value={desc} onChange={this.onChangeDesc} />
        <button onClick={this.onAdd}>추가</button>
        <button onClick={this.onSaveToServer}>서버에 저장</button>
      </div>
    );
  }
}