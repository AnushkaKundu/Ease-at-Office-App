import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ username }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:9002/todos', {
        params: { userId: username },
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:9002/todos', {
        text: newTodo, // Update variable name from 'newTodo' to 'todoText'
        userId: username,
      });
      const newTodoItem = response.data.todo; // Update variable name from 'newTodo' to 'newTodoItem'
      setTodos((prevTodos) => [...prevTodos, newTodoItem]); // Update variable name from 'newTodo' to 'newTodoItem'
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:9002/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="maindiv">
  <header>Todo List</header>
  <br />
  <div className="input-container">
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button onClick={addTodo}>Add Todo</button>
  </div>
  <div className="hr">
    <hr />
  </div>
    <div className='one-todo'>
    {todos.map((todo) => (
      <span key={todo._id} className="todotxt">
      {todo.text}
      <div className="cross-container">
        <button className="cross-button" onClick={() => deleteTodo(todo._id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </span>
    
    ))}
    </div>
</div>

  );
};

export default Todo;
