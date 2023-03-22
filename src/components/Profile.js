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
        if (response.ok == false) {
          window.location.reload(false);
        }
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
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Select a file!');
      return;
    }
    const passport = document.querySelector('#passport');
    const formData = new FormData();
    formData.append('file', image);

    let response = await fetch(
      `http://localhost:8000/verify/?number=${passport.value}`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }
    );
    let res = await response.json();
    if (response.ok == false) {
      alert(res.detail);
    }
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
          period: changes[7].value,
          amount: changes[8].value,
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
      <div className='grid grid-cols-2 bg-orange-200 h-screen px-24 gap-10'>
        <div>
          <h2 className='text-2xl font-bold ml-5 text-white pt-5'>
            Your Profile
          </h2>
          <section className='p-5'>
            <div className='flex flex-col text-white text-2xl'>
              <span>Email: {user.email}</span>
              <span>First Name: {user.firstName}</span>
              <span>Middle Name: {user.middleName}</span>
              <span>Last Name: {user.lastName}</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className='grid grid-cols-2 text-white gap-2 mt-2'
            >
              <div className='mb-2'>
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
              <div className='mb-2'>
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
              <div className='mb-2'>
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
              <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'>
                Change Data
              </button>
            </form>
          </section>
        </div>
        <div>
          <label
            className='block text-white text-2xl font-bold mb-2 mt-5'
            htmlFor='verify'
          >
            Verify your passport
          </label>
          <form
            onSubmit={handleUpload}
            className='grid grid-cols-3 text-white gap-10 mt-10 mr-5'
          >
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='period'
              >
                Passport
              </label>
              <input
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='passport'
                type='text'
                placeholder='Enter passport'
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='amount'
              >
                File
              </label>
              <input
                onChange={handleImage}
                className=' bg-white shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                id='verify'
                type='file'
                accept='image/png, image/jpeg'
              />
            </div>
            <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 mb-4 border-b-4 border-orange-700 hover:border-orange-500 mt-2 rounded mr-2 text-center w-full'>
              Confirm
            </button>
          </form>
          <h2 className='text-2xl font-bold text-white mt-5'>New Loan</h2>
          <form
            onSubmit={handleNewLoan}
            className='grid grid-cols-3 text-white gap-10 mt-10 mr-5'
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
            <div className='overflow-x-auto  sm:rounded-lg mr-5'>
              <table className='w-full text-sm text-left text-white '>
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
      </div>
    </>
  );
}
export default Profile;
