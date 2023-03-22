import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Operator() {
  const navigate = useNavigate();
  const [image, setImage] = useState(
    'https://klike.net/uploads/posts/2022-06/1654842544_1.jpg'
  );
  const [unverifs, setUnverifs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/operation', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        setUnverifs(result.data);
      });
  }, []);
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
  const handleImage = async (e) => {
    const response = await fetch(
      `http://localhost:8000/operation/photo/${e.target.id}`,
      {
        credentials: 'include',
      }
    );

    const res = await response.json();
    setImage(res);
    if (response.ok == false) {
      alert(res.detail);
    } else {
      alert(res);
    }
  };
  const handleVerify = async (e) => {
    const response = await fetch(
      `http://localhost:8000/operation/verify/${e.target.id}`,
      {
        credentials: 'include',
      }
    );

    const res = await response.json();
    if (response.ok == false) {
      alert(res.detail);
    } else {
      alert('Verified');
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
        <h2 className='text-2xl font-bold text-center text-white pt-10 mb-5'>
          Operator menu
        </h2>
        {unverifs.length == 0 ? null : (
          <div className='overflow-x-auto  sm:rounded-lg mx-5'>
            <table className='w-full text-sm text-left text-white '>
              <thead className='text-xs text-white uppercase bg-orange-500'>
                <tr>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Middle Name</th>
                  <th className='px-6 py-3'>Last Name </th>
                  <th className='px-6 py-3'>Email</th>
                  <th className='px-6 py-3'>Registered Date</th>
                  <th className='px-6 py-3'>Passport</th>
                  <th className='px-6 py-3'>Filename</th>
                  <th className='px-6 py-3'>Verify</th>
                </tr>
              </thead>
              <tbody>
                {unverifs.map((unverif) => (
                  <tr key={unverif.user.userId} className='bg-orange-400'>
                    <td className='px-6 py-4'>{unverif.user.firstName}</td>
                    <td className='px-6 py-4'>{unverif.user.middleName}</td>
                    <td className='px-6 py-4'>{unverif.user.lastName}</td>
                    <td className='px-6 py-4'>{unverif.user.email}</td>
                    <td className='px-6 py-4'>{unverif.user.registeredAt}</td>
                    <td className='px-6 py-4'>{unverif.number}</td>
                    <td className='px-6 py-4'>
                      <button id={unverif.filename} onClick={handleImage}>
                        Check the passport
                      </button>
                    </td>
                    <td className='px-6 py-4'>
                      <button id={unverif.user.userId} onClick={handleVerify}>
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='mx-auto w-1/4 mt-10'>
          <img src={image}></img>
        </div>
      </div>
    </>
  );
}
export default Operator;
