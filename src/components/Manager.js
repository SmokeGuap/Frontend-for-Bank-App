import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Manager() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/management', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        setLoans(result.data);
      });
  }, [loans]);
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
    }
  };

  const handleMore = async (user) => {
    const response = await fetch(
      `http://localhost:8000/management/history/${user}`,
      {
        credentials: 'include',
      }
    );
    const res = await response.json();
    setUsers(res.data);
    console.log('click more');
  };
  const handleSubmit = async (id, decision) => {
    const response = await fetch(
      `http://localhost:8000/management/response/${id}?decision=${decision}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    const res = await response.json();
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
        <h2 className='text-2xl font-bold text-center text-white pt-10 mb-5'>
          Manager menu
        </h2>
        {users.length == 0 ? null : (
          <div className='overflow-x-auto  sm:rounded-lg mx-5 w-1/2 mb-10'>
            <table className='w-full text-sm text-left text-white '>
              <thead className='text-xs text-white uppercase bg-orange-300'>
                <tr>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Last Name</th>
                  <th className='px-6 py-3'>Middle Name</th>
                  <th className='px-6 py-3'>passport</th>
                  <th className='px-6 py-3'>Period</th>
                  <th className='px-6 py-3'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='bg-orange-300'>
                    <td className='px-6 py-4'>{user.first_name}</td>
                    <td className='px-6 py-4'>{user.last_name}</td>
                    <td className='px-6 py-4'>{user.middle_name}</td>
                    <td className='px-6 py-4'>{user.passport}</td>
                    <td className='px-6 py-4'>{user.period}</td>
                    <td className='px-6 py-4'>{user.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {loans.length == 0 ? null : (
          <div className='overflow-x-auto  sm:rounded-lg mx-5'>
            <table className='w-full text-sm text-left text-white '>
              <thead className='text-xs text-white uppercase bg-orange-500'>
                <tr>
                  <th className='px-6 py-3'>Creation Date</th>
                  <th className='px-6 py-3'>End Date</th>
                  <th className='px-6 py-3'>Status</th>
                  <th className='px-6 py-3'>Period</th>
                  <th className='px-6 py-3'>Amount</th>
                  <th className='px-6 py-3'>More</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className='bg-orange-400'>
                    <td className='px-6 py-4'>{loan.creation_date}</td>
                    <td className='px-6 py-4'>
                      {loan.end_date == null ? 'NULL' : loan.end_date}
                    </td>
                    <td className='px-6 py-4'>{loan.status}</td>
                    <td className='px-6 py-4'>{loan.period}</td>
                    <td className='px-6 py-4'>{loan.amount}</td>
                    <td className='px-6 py-4'>
                      <button onClick={()=>{handleMore(loan.user_id)}}>
                        About User
                      </button>
                    </td>
                    <td className='cursor-pointer bg-green-500 ml-2 px-6 py-4 hover:bg-green-700 '>
                      <button onClick={()=>{handleSubmit(loan.user_id, true)}}>
                        YES
                      </button>
                    </td>
                    <td className='cursor-pointer bg-red-500 px-6 py-4 hover:bg-red-700'>
                      <button onClick={()=>{handleSubmit(loan.user_id, false)}}>
                        NO
                      </button>
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
export default Manager;
