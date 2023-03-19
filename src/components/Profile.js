import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    passport: '',
  });
  // useEffect(() => {
  //   console.log('test');
  //   fetch('http://188.235.199.178:8000/users/me')
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  // }, []);
  const handleSubmit = async () => {
    const changes = document.querySelectorAll('input');
    if (
      /^[A-ZА-ЯЁ]+$/i.test(changes[2].value) &&
      /^[A-ZА-ЯЁ]+$/i.test(changes[3].value) &&
      /^[A-ZА-ЯЁ]+$/i.test(changes[4].value)
    ) {
      setUser({
        email: changes[0].value,
        password: changes[1].value,
        firstName: changes[2].value,
        middleName: changes[3].value,
        lastName: changes[4].value,
      });
      // let response = await fetch('http://localhost:8000/users/me', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      //   body: JSON.stringify(user),
      // });
      // let result = await response.json();
      // console.log(result);
    } else {
      alert('Цифры убери даун!');
    }
  };
  const logout = () => {};
  return (
    <>
      <nav className='bg-orange-300 border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-end items-center mx-auto max-w-screen-xl'>
          <Link
            onClick={logout}
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 w-1/6 text-center'
            to='/'
          >
            Log Out
          </Link>
          <Link
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-30 w-1/6 text-center mr-2'
            to='/'
          >
            Back to home
          </Link>
        </div>
      </nav>
      <div className='bg-orange-200 h-screen'>
        <h2 className='text-2xl font-bold text-center text-white pt-10'>
          Your Profile
        </h2>
        <section className='container mx-auto p-5 w-1/2'>
          <div className='flex flex-col text-white text-2xl'>
            <span>Email: {user.email}</span>
            <span>First Name: {user.firstName}</span>
            <span>Middle Name: {user.middleName}</span>
            <span>Last Name: {user.lastName}</span>
          </div>

          <div className='grid grid-cols-2 text-white gap-10 mt-10'>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='email'
                placeholder='Enter email'
                type='text'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='password'
                placeholder='Enter password'
                type='password'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='passport'
              >
                First Name
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='firstName'
                placeholder='Enter First Name'
                type='text'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='passport'
              >
                Middle Name
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='middleName'
                placeholder='Enter Middle Name'
                type='text'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='lastName'
                placeholder='Enter Last Name'
                type='text'
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'
          >
            Change Data
          </button>
        </section>
      </div>
    </>
  );
}
export default Profile;
