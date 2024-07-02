import React from 'react';

const Toast = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
