import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Accountant() {
  useEffect(() => {
    fetch('http://localhost:8000/accountant', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }, []);
  return <>Accountant</>;
}
export default Accountant;
