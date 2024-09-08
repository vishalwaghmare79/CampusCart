import React from 'react';
import spinner from '../../assets/spinner.gif';

function Spinner() {
  return (
    <div className="spinner-container">
        <img src={spinner} alt="spinner-gif" className="spinner-image" />
    </div>
  );
}

export default Spinner;
