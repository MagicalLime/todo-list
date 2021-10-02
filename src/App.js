import React, {useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // We get the local storage items, parse them from JSON into an array
  // then we check whether there are stored todos and if there are, we set them
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // we store the todos in localStorage with a key that we define above, we also
  // stringify it into JSON
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] // we create a copy
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // eventhandler that is called when we click the Add Todo button
  function handleAddTodo(e) {
     const name = todoNameRef.current.value
     if (name === '') return
     setTodos(prevTodos => {
       return [...prevTodos, { id: uuidv4(), name: name, complete: false}]

     })
     todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/> 
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add Todo</button>
      <button onClick={handleClearTodos}> Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>

    
    
    
    </>
  )
}

export default App;
