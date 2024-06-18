import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/todo';

interface Todo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  userId: string;
}


const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Authorization header:', axiosInstance.defaults.headers.Authorization); // Add this line
    const response = await axiosInstance.get(`${baseURL}/todos`);
    return response.data.todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todo: Omit<Todo, '_id'>): Promise<Todo> => {
  try {
    const response = await axiosInstance.post(`${baseURL}/add`, todo);
    console.log("New Todo created:", response.data.todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id: string, updatedTodo: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await axiosInstance.put(`${baseURL}/edit/${id}`, updatedTodo);
    return response.data.todos[0] && response.data; 
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<Todo> => {
  try {
    const response = await axiosInstance.delete(`${baseURL}/delete/${id}`);
    return response.data.todo && response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};