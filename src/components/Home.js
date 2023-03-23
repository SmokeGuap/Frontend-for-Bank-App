import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, userInfo } from '../APIs';
import vagner from '../assets/vagner.png';

function Home() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  useEffect(() => {
    userInfo()
      .then((response) => response.json())
      .then((res) => {
        if (res.role_id == 0) setCheck(true);
        if (res.role_id == 1) navigate('/operator');
        if (res.role_id == 2) navigate('/manager');
        if (res.role_id == 3) navigate('/accountant');
        if (res.role_id == 100) navigate('/admin');
      });
  }, []);
  const handleLogout = async () => {
    let response = await logout();
    let res = await response.json();
    if (response.status == 200) {
      navigate('/login');
    } else {
      alert(res.detail);
      alert();
    }
  };
  let test = check ? (
    <div className='flex flex-wrap justify-end items-center mx-auto max-w-screen-xl'>
      <Link
        className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 w-1/6 text-center'
        to='/profile'
      >
        Profile
      </Link>
      <button
        className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 w-1/6 text-center'
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  ) : (
    <div className='flex flex-wrap justify-end items-center mx-auto max-w-screen-xl'>
      <Link
        className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mr-2 w-1/6 text-center'
        to='/login'
      >
        Log in
      </Link>
      <Link
        className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded w-30 w-1/6 text-center'
        to='/reg'
      >
        Register
      </Link>
    </div>
  );
  return (
    <Fragment>
      <nav className='bg-orange-300 border-gray-200 px-4 lg:px-6 py-2.5'>
        {test}
      </nav>
      <div className='bg-orange-200'>
        <section className='container mx-auto px-6 p-10'>
          <h2 className='text-4xl font-bold text-center mb-8 text-white'>
            Our advantages
          </h2>
          <div className='flex items-center flex-wrap mb-20'>
            <div className='w-full md:w-3/4'>
              <h4 className='text-3xl font-bold mb-3 text-white'>
                Horoshiy bank
              </h4>
              <p className='mb-8 text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                ullam temporibus, quidem modi officia eveniet ad maiores
                eligendi, fuga ex tempore. Minus ab numquam animi tempora sint
                quo cum perspiciatis.
              </p>
            </div>
            <div className='md:w-1/4'>
              <img src={vagner} alt='CHVK' />
            </div>
          </div>

          <div className='flex items-center flex-wrap mb-20'>
            <div className='md:w-1/4'>
              <img src={vagner} alt='CHVK' />
            </div>
            <div className='w-full md:w-3/4 pl-10'>
              <h4 className='text-3xl font-bold mb-3 text-white'>
                Horoshiy bank
              </h4>
              <p className='mb-8 text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                ullam temporibus, quidem modi officia eveniet ad maiores
                eligendi, fuga ex tempore. Minus ab numquam animi tempora sint
                quo cum perspiciatis.
              </p>
            </div>
          </div>

          <div className='flex items-center flex-wrap mb-20'>
            <div className='md:w-3/4'>
              <h4 className='text-3xl font-bold mb-3 text-white'>
                Horoshiy bank
              </h4>
              <p className='mb-8 text-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                ullam temporibus, quidem modi officia eveniet ad maiores
                eligendi, fuga ex tempore. Minus ab numquam animi tempora sint
                quo cum perspiciatis.
              </p>
            </div>
            <div className='md:w-1/4'>
              <img src={vagner} alt='CHVK' />
            </div>
          </div>
        </section>
        <footer className='bg-orange rounded-lg shadow'>
          <div className='w-full container mx-auto p-4 md:px-6 md:py-8'>
            <hr className='my-6 border-white' />
            <span className='block text-white text-center'>
              © All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}
export default Home;
