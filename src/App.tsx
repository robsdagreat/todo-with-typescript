import React, { useEffect, useState } from 'react';
import './App.css';
import Add from './AddTodo.js';
import Todos from './Todos.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import { getTodos, updateTodo, deleteTodo } from './todoServices.js';
// import { Canvas } from '@react-three/fiber';
// import Logo from './Logo';

export interface Todo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const userId = '...';

  const handleTodoDelete = async (deletedTodoId: string) => {
    try {
      await deleteTodo(deletedTodoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== deletedTodoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleComplete = async (id: string, status: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, { status });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/todo'
          element={
            <div className="bg-gray-700 mt-20 ml-20 rounded-lg w-11/12 p-20">
              <div className="flex justify-center">
                <h2 className="text-lg text-white font-bold">My Todos</h2>
              </div>
              <div className="flex items-center justify-center">
                {userId && <Add userId={userId} />}
              </div>
              <div className="flex flex-col items-center">
                {todos.map((todo) => (
                  <Todos
                    key={todo._id}
                    _id={todo._id}
                    title={todo.name}
                    description={todo.description}
                    status={todo.status}
                    onDelete={handleTodoDelete}
                    onComplete={handleComplete}
                    onUpdate={handleTodoUpdate}
                  />
                ))}
              </div>
                {/* <div className="flex justify-center mt-10">
                  <Canvas>
                    <Logo />
                  </Canvas>
                </div> */}
              </div>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
