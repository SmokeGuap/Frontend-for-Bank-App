import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Manager() {
  useEffect(() => {
    fetch('http://localhost:8000/managment', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }, []);
  return <>Manager</>;
}
export default Manager;
