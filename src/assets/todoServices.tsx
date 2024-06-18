import axios from 'axios'


interface Todo {
    _id: string;
    name: string;
    description: string;
    status: boolean;
  }

const baseUrl = 'http://localhost:3000/api/todos';

export const getTodos = async (): Promise<Todo[]> =>{
    try{
        const response = await axios.get(baseUrl);
        return response.data.todos;

    } catch(error){
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const createTodo = async (todo: Omit<Todo, '_id'>): Promise<Todo> =>{
    try{
        const response = await axios.post(baseUrl, todo);
        return response.data.todo;
    } catch(error){
        console.error('Error creating todo:', error);
        throw error;
    }
};

export const updateTodo = async(id: string, updatedTodo: Partial<Todo>): Promise<Todo> =>{
    try{
        const response = await axios.put(`${baseUrl}/${id}`, updatedTodo);
        return response.data.todo;
    } catch(error){
        console.error("Error updating todo:", error);
        throw error;
    }
};

export const deleteTodo = async (id: string): Promise<Todo> =>{
    try{
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data.todo;

    } catch(error){
        console.error('Error deleting todo:', error);
        throw error;
    }
}