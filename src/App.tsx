import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import SearchTodoList from './components/SearchTodoList';

const App: React.FC = () => {
  //useState
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [mode, setMode] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchTodoList, setSearchTodoList] = useState<Todo[]>([]);

  //useRef
  const allRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);
  const completedRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const AppRef = useRef<HTMLInputElement>(null);
  const componentsRef = useRef<HTMLInputElement>(null);
  const isSearchRef = useRef<HTMLInputElement>(null);

  function handleAll() {
    if (allRef.current && activeRef.current && completedRef.current) {
      allRef.current.style.border = "1px solid red";
      activeRef.current.style.border = "1px solid transparent";
      completedRef.current.style.border = "1px solid transparent";
    }
    setFilter("all");
  }

  function handleActive() {
    if (allRef.current && activeRef.current && completedRef.current) {
      allRef.current.style.border = "1px solid transparent";
      activeRef.current.style.border = "1px solid red";
      completedRef.current.style.border = "1px solid transparent";
    }
    setFilter("active");
  }

  function handleCompleted() {
    if (allRef.current && activeRef.current && completedRef.current) {
      allRef.current.style.border = "1px solid transparent";
      activeRef.current.style.border = "1px solid transparent";
      completedRef.current.style.border = "1px solid red";
    }
    setFilter("completed");
  }

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTodoList(todoList);
      setSearchTodoList(todoList);
    } else if (filter === 'active') {
      setFilteredTodoList(todoList.filter((todo) => !todo.isDone));
      setSearchTodoList(todoList.filter((todo) => !todo.isDone));
    } else if (filter === 'completed') {
      setFilteredTodoList(todoList.filter((todo) => todo.isDone));
      setSearchTodoList(todoList.filter((todo) => todo.isDone));
    }
  }, [filter, todoList]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  }

  function handleDarkMode() {
    if (containerRef.current && componentsRef.current) {
      if (!mode) {
        containerRef.current.style.backgroundColor = "black";
        componentsRef.current.style.color = "white";
      } else {
        containerRef.current.style.backgroundColor = "white";
        componentsRef.current.style.color = "black";
      }
    }
    setMode(!mode);
  }
  
  function handleSearch(e: any) {
    // setIsSearch(!isSearch);
    if (e.target.value === "") {
        setSearchTodoList(filteredTodoList);
        return;
    }
    const searchList = filteredTodoList.filter((todo) => todo.todo.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    setSearchTodoList(searchList);
  }

  return (
    <div className='App' ref={AppRef}>
      <div className='container' ref={containerRef}>
        <div className='components' ref={componentsRef}>
          <h1 className='heading'>Things to do</h1>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          {
            isSearch ? (
              <SearchTodoList todoList={todoList} setTodoList={setTodoList} searchTodoList={searchTodoList}/>
            ) : (
              <TodoList todoList={todoList} setTodoList={setTodoList} filteredTodoList={filteredTodoList}/>
            )
          }
        </div>
        <Navbar
          filteredTodoList={filteredTodoList}
          allRef={allRef}
          activeRef={activeRef}
          completedRef={completedRef}
          handleAll={handleAll}
          handleActive={handleActive}
          handleCompleted={handleCompleted}
          mode={mode}
          handleDarkMode={handleDarkMode}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          handleSearch={handleSearch}
          isSearchRef={isSearchRef}
          setSearchTodoList={setSearchTodoList}
        />
      </div>
    </div>
  );
};

export default App;

