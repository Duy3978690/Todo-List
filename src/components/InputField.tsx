import React from 'react'
import "./styles.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    <form onSubmit={(e) => handleAdd(e)}>
      <input value={todo} className='input__field' type="text" placeholder='Add New' onChange={(e) => setTodo(e.target.value)}/>
    </form>
  )
}

export default InputField
