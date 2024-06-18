import React, { useState } from 'react';
import Button from './Button.js'
import { createTodo } from './todoServices.js'

interface AddTodoProps {
  userId: string;
}


const AddTodo: React.FC<AddTodoProps> = ({ userId })=> {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();


        try{
            const response = await createTodo({name, description, status: false, userId});
            setMessage(response.message);

        } catch(error){
            console.error("Error creating todo:", error);
        }

        setName('');
        setDescription('');
    };


  return (
    <>  
     <div className='text-green-600 mt-4 font-semibold'>
         <h2>{message}</h2>
     </div>
  <div className='shadow-lg w-2/3 flex flex-row justify-center py-20 mb-10'>
        <form onSubmit={handleSubmit} className="mx-8 flex flex-row">
        <div className='mx-8 flex flex-row'>
        <label className="mt-2 text-lg mr-2 text-gray-400">Name</label>
        <input className='p-2 rounded outline-none' type='text'
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='text-black flex flex-row'>
        <label className="mt-2 text-lg mr-2 text-gray-400">Description</label>
        <input className='p-2 mr-20 rounded outline-none'  type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
        <div className="bg-blue-500 rounded border-none mr-4">
          <Button text="Add Todo" />
        </div>
      </form>
      
    </div>
    </>

  )
}

export default AddTodo;
