import React, { useEffect } from 'react'
import { FaMoon } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import "./styles.css"
import { Todo } from './model';
import { FaSun } from "react-icons/fa";

interface Props {
    filteredTodoList: Todo[];
    allRef: React.RefObject<HTMLInputElement>;
    activeRef: React.RefObject<HTMLInputElement>;
    completedRef: React.RefObject<HTMLInputElement>;
    handleAll(): void;
    handleActive(): void;
    handleCompleted(): void;
    mode: boolean;
    handleDarkMode: () => void;
    isSearch: boolean;
    isSearchRef: React.RefObject<HTMLInputElement>;
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
    handleSearch(e: any): void;
    setSearchTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Navbar: React.FC<Props> = ({
    filteredTodoList, 
    allRef, 
    handleAll, 
    activeRef, 
    handleActive, 
    completedRef, 
    handleCompleted,
    mode,
    handleDarkMode,
    isSearch,
    isSearchRef,
    setIsSearch,
    handleSearch,
    setSearchTodoList,
}) => {     

    useEffect(() => {
        if (isSearch) {
            isSearchRef.current?.focus();
        }
    }, [isSearch, isSearchRef])
  return (
    <div className='navbar'>
        <div className='left'>
            <div className='icons'>
                {
                    mode ? (
                        <div className="icon" onClick={handleDarkMode}><FaSun /></div>
                    ) : (
                        <div className="icon" onClick={handleDarkMode}><FaMoon /></div>
                    )
                }
                    <div className="icon" onClick={() => {setIsSearch(!isSearch); setSearchTodoList(filteredTodoList)}}><SlMagnifier /></div>
            </div>
            <div className='vertical__line'></div>
            {
                isSearch ? (
                    <input className="search__bar" type="text" onChange={handleSearch} ref={isSearchRef}/>
                ) : (
                    <div>{filteredTodoList.length} items left</div>
                )
            }
        </div>
            
        <div className="right">
            <div className='status' ref={allRef} onClick={handleAll}>All</div>
            <div className='status' ref={activeRef} onClick={handleActive}>Active</div>
            <div className='status' ref={completedRef} onClick={handleCompleted}>Completed</div>
        </div>
    </div>
  )
}

export default Navbar
