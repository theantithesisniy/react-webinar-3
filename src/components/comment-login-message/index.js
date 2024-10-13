import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

function CommentLoginMessage({ onCancel }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login', { state: { back: location.pathname } });
  };

  return (
    <div className="login-message">
      <button onClick={handleLoginClick} className="login-link">
        Войдите
      </button>, чтобы иметь возможность ответить.
      <button onClick={onCancel} className="cancel-link">
        Отмена
      </button>
    </div>
  );
}

export default CommentLoginMessage;
