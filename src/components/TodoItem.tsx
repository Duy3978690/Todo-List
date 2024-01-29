import React, { useEffect, useRef, useState } from 'react';
import "./styles.css";
import { Todo } from './model';
import { FaCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface Props {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todoList, setTodoList }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoEdit, setTodoEdit] = useState<string>(todo.todo);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const handleDone = (id: number) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodoList(todoList.map((item) => item.id === id ? { ...item, todo: todoEdit } : item));
    setIsEdit(false);
  };

  const handleDelete = (id: number) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleBlur = () => {
    if (!isHovered) {
      setTodoEdit(todo.todo)
      setIsEdit(!isEdit);
    }
  };

  return (
    <div>
      <form className='todoList__item' onSubmit={(e) => handleEdit(e, todo.id)}>
        <ul className='todo'>
          {
            isEdit ? (
              <input
                className='todo__input'
                ref={inputRef}
                type="text"
                value={todoEdit}
                onChange={(e) => { setTodoEdit(e.target.value) }}
                onBlur={handleBlur}
                required
              />
            ) : (
              todo.isDone ? (
                <s className='todo__name'>{todo.todo}</s>
              ) : (
                <span className='todo__name'>{todo.todo}</span>
              )
            )
          }
        </ul>
        <div className="crud">
        {
            isEdit ? (
              <button className='crud__icon save__button' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} type='submit'>save</button>
            ) : (
              <span className='crud__icon' onClick={() => { if (!isEdit && !todo.isDone) { setIsEdit(!isEdit); } }}><CiEdit /></span>
            )
          }
          <span className='crud__icon' onClick={() => handleDone(todo.id)}><FaCheck /></span>  
          <span className='crud__icon' onClick={() => handleDelete(todo.id)}><MdDeleteForever /></span>
        </div>
      </form>
    </div>
  );
}

export default TodoItem;
