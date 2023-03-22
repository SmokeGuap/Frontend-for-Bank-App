import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Operator() {
  useEffect(() => {
    fetch('http://localhost:8000/operation', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }, []);
  return <>Operator</>;
}
export default Operator;
