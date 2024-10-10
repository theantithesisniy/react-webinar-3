import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'
function CommentLoginMessage({ onCancel }) {
  return (
    <div className="login-message">
      <Link to="/login" className="login-link">
        Войдите
      </Link>,чтобы иметь возможность ответить.
      <button onClick={onCancel} className="cancel-link">
        Отмена
      </button>
    </div>
  );
}

export default CommentLoginMessage;
