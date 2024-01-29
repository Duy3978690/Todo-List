import React from 'react'
import TodoItem from './TodoItem';
import { Todo } from './model';

interface Props {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    searchTodoList: Todo[]
}

const SearchTodoList: React.FC<Props> = ({ todoList, setTodoList, searchTodoList }) => {
  return (
    <div className='todo__list'>
      {
        searchTodoList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList}/>
        ))
      }
    </div>
  )
}

export default SearchTodoList
