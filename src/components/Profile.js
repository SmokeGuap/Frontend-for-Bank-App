import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    id: 0,
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
      .then(async (result) => {
        setUser({
          id: result.id,
          email: result.email,
          firstName: result.first_name,
          middleName: result.middle_name,
          lastName: result.last_name,
        });
        getLoans();
      });
  }, []);

  const getLoans = async () => {
    try {
      fetch(`http://localhost:8000/loans/?user_id=${user.id}`, {
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((result) => {
          setLoans(result.data);
        });
    } catch (e) {
      console.log('Fetch error: ', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const changes = document.querySelectorAll('input');
    if (
      changes[0].value.length != 0 ||
      changes[1].value.length != 0 ||
      changes[2].value.length != 0 ||
      changes[3].value.length != 0 ||
      changes[4].value.length != 0
    ) {
      if (
        /^[A-ZА-ЯЁ]+$/i.test(changes[2].value) &&
        /^[A-ZА-ЯЁ]+$/i.test(changes[3].value) &&
        /^[A-ZА-ЯЁ]+$/i.test(changes[4].value)
      ) {
        let response = await fetch('http://localhost:8000/users/me', {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            email: changes[0].value.length == 0 ? user.email : changes[0].value,
            password:
              changes[1].value.length == 0 ? user.password : changes[1].value,
            first_name:
              changes[2].value.length == 0 ? user.firstName : changes[2].value,
            middle_name:
              changes[3].value.length == 0 ? user.middleName : changes[3].value,
            last_name:
              changes[4].value.length == 0 ? user.lastName : changes[4].value,
          }),
        });
        console.log(response);
        let result = await response.json();
        setUser({
          email: result.email,
          firstName: result.first_name,
          middleName: result.middle_name,
          lastName: result.last_name,
        });
        console.log(result);
      } else if (
        changes[2].value.length != 0 ||
        changes[3].value.length != 0 ||
        changes[4].value.length != 0
      ) {
        alert('Цифры уберите в ФИО!');
      }
    } else {
      alert('Вы ничего не ввели!');
    }
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
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!image) {
      alert('Select a file!');
      return;
    }
    const formData = new FormData();
    formData.append('filename', image);

    let response = await fetch('http://localhost:8000/verify/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'multipart/form-data',
      },
      body: formData,
    });
    let res = await response.json();
    console.log(image);
    console.log(formData);
    console.log(response);
    console.log(res);
  };
  const handleNewLoan = async (e) => {
    e.preventDefault();
    const changes = document.querySelectorAll('input');
    try {
      let response = await fetch('http://localhost:8000/loans/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          period: changes[6].value,
          amount: changes[7].value,
        }),
      });
      let res = await response.json();
      console.log(res);
      if (response.ok == true) {
        alert('Registered');
      }
      if (response.ok == false) {
        alert(res.detail);
      }
      getLoans();
    } catch (e) {
      console.log('Fetch error: ', e);
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
          <Link
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-30 w-1/6 text-center mr-2'
            to='/'
          >
            Back to home
          </Link>
        </div>
      </nav>
      <div className='bg-orange-200 min-h-screen'>
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

          <form
            onSubmit={handleSubmit}
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
              Change Data
            </button>
          </form>
        </section>
        <div className='container mx-auto p-5 w-1/3'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='verify'
          >
            Verify your passport
          </label>
          <input
            onChange={handleImage}
            className='bg-white shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
            id='verify'
            type='file'
            accept='image/png, image/jpeg'
          />
          <button
            onClick={handleUpload}
            className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'
          >
            Confirm
          </button>
        </div>
        <h2 className='text-2xl font-bold text-center text-white pt-10'>
          New Loan
        </h2>
        <form
          onSubmit={handleNewLoan}
          className='container mx-auto grid grid-cols-3 text-white gap-10 mt-10'
        >
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='period'
            >
              Period
            </label>
            <input
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
              id='period'
              placeholder='Enter period'
              type='text'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-white text-sm font-bold mb-2'
              htmlFor='amount'
            >
              Amount
            </label>
            <input
              className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
              id='amount'
              placeholder='Enter amount'
              type='text'
            />
          </div>
          <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'>
            Create Loan
          </button>
        </form>
        {loans.length == 0 ? null : (
          <div className='container mx-auto overflow-x-auto  sm:rounded-lg'>
            <table className='w-full text-sm text-left text-white'>
              <thead className='text-xs text-white uppercase bg-orange-500'>
                <tr>
                  <th className='px-6 py-3'>Period</th>
                  <th className='px-6 py-3'>Amount</th>
                  <th className='px-6 py-3'>Status</th>
                  <th className='px-6 py-3'>Creation Date</th>
                  <th className='px-6 py-3'>End Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className='bg-orange-400'>
                    <td className='px-6 py-4 font-medium text-white'>
                      {loan.period}
                    </td>
                    <td className='px-6 py-4'>{loan.amount}</td>
                    <td className='px-6 py-4'>{loan.status}</td>
                    <td className='px-6 py-4'>{loan.creation_date}</td>
                    <td className='px-6 py-4'>
                      {loan.end_date == null ? 'NULL' : loan.end_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
export default Profile;
