import * as React from 'react';

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    
    this.state = {
      currentTask: '',
      tasks: []
    }
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: '',
      tasks: [
        ...this.state.tasks, 
        this.state.currentTask
      ]
    })
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: string, index: number) => {
      return (
        <div key={index}>{task}</div>
      )
    });
  }

  public render(): JSX.Element {
    console.log(this.state);
    return (
      <div>
        <h1>React Typescript Todo List</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type='text'
            placeholder='Add a Task'
            value={ this.state.currentTask }
            onChange={(e) => this.setState({ currentTask: e.target.value })}
          />
          <button type='submit'>Add Task</button>
        </form>
        <section>{ this.renderTasks() }</section>
      </div>
    );
  }
}

interface IState {
  currentTask: string;
  tasks: Array<string>;
}
