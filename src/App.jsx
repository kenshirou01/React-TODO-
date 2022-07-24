import React, { useState } from 'react';
import './styles.css';
import { InputTodo } from './components/inputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/completeTodos';

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
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
      />
    </>
  );
}
