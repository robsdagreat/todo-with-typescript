import React, {useState} from 'react'
import axios from 'axios';
import Button from './Button.js'
import { Link } from 'react-router-dom';


const Register = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/create', { email, password });
      console.log(response.data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
    }
  };
  return (
    <div className='bg-gray-700 mt-20 ml-20 rounded-lg w-11/12 p-20'>
       <div className="flex justify-center items-center">
      <div className="shadow-lg w-1/2 flex flex-col justify-center py-20 mb-10">
        <h2 className="text-2xl text-white font-bold mb-4 flex justify-center mr-20">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-10 flex flex-col ml-40 text-white">
            <label htmlFor="email" className="block font-bold mb-2">
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
          <div className="mb-4 flex flex-col ml-40 text-white">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className='bg-blue-600 px-2 py-1 rounded border-none w-24 ml-80'>
             <Button text='Register'/>
          </div>
          <div className='text-white text-lg font-semibold items-center cursor-pointer flex justify-center mr-14 mt-4'>
            <Link to={'http://localhost:5173'}>Or login</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register;
