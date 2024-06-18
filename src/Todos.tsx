import Button from './Button.js';
import { useState } from 'react';
import { updateTodo } from './todoServices.js';
import {Todo} from './App.js'

interface TodoProps {
  _id?: string;
  title: string;
  description: string;
  status?: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string, status: boolean) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

const Todos: React.FC<TodoProps> = ({ _id, title, description, status, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      await updateTodo(_id || '', {
        name: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="w-2/3 flex flex-row py-4 px-4 shadow-lg mt-4">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="mx-2 p-2 rounded outline-none"
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="mx-2 p-2 rounded outline-none"
          />
          <div className='bg-blue-500 rounded ml-5'>
          <Button text="Save" onClick={handleUpdate} />
          </div>
          <div className='bg-red-500 rounded ml-5'>
          <Button text="Cancel" onClick={() => setIsEditing(false)} />
          </div>
        </>
      ) : (
        <>
          <div className="mx-10 text-white">
            <h2 className="text-lg font-bold">{title}</h2>
            <h4 className="text-lg">{description.slice(0, 30)}</h4>
          </div>
          <div className="flex flex-row mx-4 p-2 rounded font-bold ml-48">
            <div className="ml-40 bg-green-500 rounded ">
              <Button
                text={status ? 'Completed' : 'Mark'}
                onClick={() => onComplete(_id || '', !status)}
              />
            </div>
            <div className="ml-20 bg-red-500 rounded float-right">
              <Button text="Delete" onClick={() => onDelete(_id || '')} />
            </div>
            <div className="ml-20 bg-yellow-500 rounded float-right">
              <Button text="Edit" onClick={() => setIsEditing(true)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
