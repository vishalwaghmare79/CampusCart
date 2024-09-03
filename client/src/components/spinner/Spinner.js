import React from 'react';
import spinner from '../../assets/spinner.gif';

function Spinner({heading}) {
  return (
    <div className="spinner-container">
        <img src={spinner} alt="spinner-gif" className="spinner-image" />
        <h1>{heading}</h1>
    </div>
  );
}

export default Spinner;
