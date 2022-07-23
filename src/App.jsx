import React, { useState } from 'react';
import './styles.css';

export const App = () => {

  const [todoText, setTodoText] = useState('');

  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () =>{
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    deleteIncompleteList(index, incompleteTodos);
  };

  const onClickComplete = (index) => {
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
    deleteIncompleteList(index, incompleteTodos);
  };

  const onClickBack = (index) => {
    // const newCompleteTodos = [...completeTodos];
    // newCompleteTodos.splice(index, 1);
    // setCompleteTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    deleteIncompleteList(index, completeTodos);
  };

  const deleteIncompleteList = (index, deleteTarget) => {
    const newTodos = [...deleteTarget];
    newTodos.splice(index, 1);
    if(deleteTarget === completeTodos){
      setCompleteTodos(newTodos);
    } else {
      setIncompleteTodos(newTodos);
    }
  };

  return (
    <>
      <div className='input-area'>
        <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className='incomplete-area'>
        <p className='title'>未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className='list-row'>
                <li>{todo}</li>
                <button onClick={() => {onClickComplete(index)}}>完了</button>
                <button onClick={() => {onClickDelete(index)}}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className='complete-area'>
        <p className='title'>完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
            <div key={todo} className='list-row'>
              <li>{todo}</li>
              <button onClick={() => {onClickBack(index)}}>戻す</button>
            </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
