import React, {useState} from 'react'
import axios from 'axios';
import Button from './Button.js';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage]= useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', { email, password });
      const {token} = response.data;
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage:', localStorage.getItem('token'));
      console.log(response.data);

      setMessage(response.data.message);
      setUserId(userId);
      
      setTimeout(()=>{
        navigate('/todo');
      }, 5000);

    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
    }
  };

  return (
    <div className='bg-gray-700 mt-10 ml-20 rounded-lg w-11/12 p-20'>
      <span className='text-3xl text-blue-700 font-bold'>RO</span><span className='text-3xl text-green-700 font-bold'>BS</span>
      <div className='flex flex-col items-center mb-10 text-white font-bold'>
        <h2 className='mb-5'>welcome to my TODO APP</h2> 
        <h2> Please login to view your todos or register if you do not have an account yet.</h2>
      </div>
    <div className="flex justify-center items-center">
    <div className="shadow-lg w-1/2 flex flex-col justify-center py-20 mb-10">
    {error && <p className="text-red-500 mb-4 flex justify-center items-center">{error}</p>}
        <h2 className="text-xl text-white font-bold mb-4 flex justify-center mr-20">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-10 flex flex-col ml-40">
            <label htmlFor="email" className="block font-bold mb-2 text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-10 flex flex-col ml-40 ">
            <label htmlFor="password" className="block font-bold mb-2 text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className='bg-blue-600 px-2 py-1 rounded border-none w-24 ml-80 '>
             <Button text='Login'/>
          </div>
          <div className='text-white font-semibold items-center cursor-pointer flex justify-center mr-14 mt-4 hover:text-gray-400'>
            <Link to={'http://localhost:5173/register'}>Or click here to Register</Link>
          </div>
        </form>
        <div className='text-green-600 ml-60 mt-4 font-semibold'>
          <h2>{message}</h2>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;