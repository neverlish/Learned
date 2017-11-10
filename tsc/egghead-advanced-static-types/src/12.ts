// 12 Query Properties with keyof and Lookup Types in TypeScript

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todo2: Todo = {
  id: 1,
  text: 'Buy milk',
  completed: false
};

// function prop(obj: Todo, key: 'id' | 'text' | 'completed') {
// function prop(obj: Todo,key: keyof Todo) {
function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

type TodoId = Todo['id'];
type TodoTextOrCompleted = Todo['text' | 'completed'];

const todo_id = prop(todo2, 'id');
const todo_text = prop(todo2, 'text');
const todo_completed = prop(todo2, 'completed');
// const todo_dueDate = prop(todo2, 'dueDate'); //  Argument of type '"dueDate"' is not assignable to parameter of type '"text" | "completed" | "id"'.
