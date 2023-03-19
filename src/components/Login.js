import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('https://188.235.199.178:8000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(user),
      });
      console.log(...response.headers);
      // if (response.status == 200) {
      //   navigate('/profile');
      // }
    } catch (e) {
      console.log('Fetch error: ', e);
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const {
      target: { id },
    } = event;
    if (id == 'email') {
      const copy = { ...user };
      copy.username = value;
      setUser(copy);
    }
    if (id == 'password') {
      const copy = { ...user };
      copy.password = value;
      setUser(copy);
    }
  };
  return (
    <>
      <div className='max-w-xs mx-auto'>
        <div className='text-2xl font-bold text-center text-gray-800'>
          Log in
        </div>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
              id='email'
              type='email'
              value={user.username}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
              id='password'
              value={user.password}
              placeholder='Enter password'
              type='password'
              onChange={handleChange}
            />
          </div>
          <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 text-center w-full'>
            Log in
          </button>
          <div className='flex flex-col'>
            <Link className='font-bold hover:text-orange-500 mb-5' to='/reg'>
              No account?
            </Link>
            <Link
              className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 text-center w-full'
              to='/'
            >
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
