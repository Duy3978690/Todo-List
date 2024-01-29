import React from 'react'
import TodoItem from './TodoItem';
import { Todo } from './model';

interface Props {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    filteredTodoList: Todo[]
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList, filteredTodoList }) => {
  return (
    <div className='todo__list'>
      {
        filteredTodoList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList}/>
        ))
      }
    </div>
  )
}

export default TodoList
