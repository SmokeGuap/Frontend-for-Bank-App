import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
  });
  useEffect(() => {
    fetch('http://localhost:8000/users/me', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.role_id != 100) {
          navigate('/');
        }
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = document.querySelector('#userId');
    const response = await fetch(
      `http://localhost:8000/users/${userID.value}`,
      {
        credentials: 'include',
      }
    );
    const res = await response.json();
    setUser({
      id: res.id,
      email: res.email,
      firstName: res.first_name,
      middleName: res.middle_name,
      lastName: res.last_name,
    });
    if (response.ok == false) {
      alert(res.detail);
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const changes = document.querySelectorAll('input');
    if (
      changes[1].value.length != 0 ||
      changes[2].value.length != 0 ||
      changes[3].value.length != 0 ||
      changes[4].value.length != 0 ||
      changes[5].value.length != 0
    ) {
      if (
        /^[A-ZА-ЯЁ]+$/i.test(changes[3].value) &&
        /^[A-ZА-ЯЁ]+$/i.test(changes[4].value) &&
        /^[A-ZА-ЯЁ]+$/i.test(changes[5].value)
      ) {
        let response = await fetch(`http://localhost:8000/users/${user.id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            email: changes[1].value.length == 0 ? user.email : changes[1].value,
            password:
              changes[2].value.length == 0 ? user.password : changes[2].value,
            first_name:
              changes[3].value.length == 0 ? user.firstName : changes[3].value,
            middle_name:
              changes[4].value.length == 0 ? user.middleName : changes[4].value,
            last_name:
              changes[5].value.length == 0 ? user.lastName : changes[5].value,
          }),
        });
        let result = await response.json();
        setUser({
          id: result.id,
          email: result.email,
          firstName: result.first_name,
          middleName: result.middle_name,
          lastName: result.last_name,
        });
      } else if (
        changes[3].value.length != 0 ||
        changes[4].value.length != 0 ||
        changes[5].value.length != 0
      ) {
        alert('Цифры уберите в ФИО!');
      }
    } else {
      alert('Вы ничего не ввели!');
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let res = await response.json();
    setUser({
      id: null,
      email: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
    });
  };
  const logout = async () => {
    let response = await fetch('http://localhost:8000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    let res = await response.json();
    if (response.status == 200) {
      navigate('/login');
    } else {
      alert(res.detail);
      alert();
    }
  };
  return (
    <>
      <nav className='bg-orange-300 border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-end items-center mx-auto max-w-screen-xl'>
          <button
            onClick={logout}
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 w-1/6 text-center'
          >
            Log Out
          </button>          
        </div>
      </nav>
      <div className='bg-orange-200 min-h-screen'>
        <h2 className='text-2xl font-bold text-center text-white pt-10'>
          Administrator menu
        </h2>
        <section className='container mx-auto p-5 w-1/2'>
          <form
            onSubmit={handleSubmit}
            className=' mx-20 text-white gap-10 mt-10'
          >
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='userId'
              >
                Select User
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='userId'
                placeholder='Enter user ID'
                type='text'
              />
              <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'>
                Confirm
              </button>
            </div>
          </form>
          <div className='flex flex-col text-white text-2xl'>
            <span>ID: {user.id}</span>
            <span>Email: {user.email}</span>
            <span>First Name: {user.firstName}</span>
            <span>Middle Name: {user.middleName}</span>
            <span>Last Name: {user.lastName}</span>
          </div>
          <form
            onSubmit={handleChange}
            className='grid grid-cols-2 text-white gap-10 mt-10'
          >
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
                type='text'
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
            <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'>
              Change User Data
            </button>
          </form>
          <button
            onClick={handleDelete}
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'
          >
            Delete User
          </button>
        </section>
      </div>
    </>
  );
}
export default Admin;
