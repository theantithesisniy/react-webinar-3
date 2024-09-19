import React from 'react';
import './style.css';

function Head({ title = '' }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
    </div>
  );
}



export default React.memo(Head);
