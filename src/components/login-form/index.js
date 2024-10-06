import { memo } from 'react';
import './style.css';

const LoginForm = ({ formData, onInputChange, onSubmit, waiting, message, errors, t }) => {
    return (
        <form className='LoginForm' onSubmit={onSubmit} method="post">
            <h4 className='LoginForm-header'> {t('login.label')}</h4>

            <label className="LoginForm-label-login" htmlFor="login">{t('login.userLogin')}</label>
            <input
                type="text"
                name="login"
                value={formData.login}
                onChange={onInputChange}
                required
                autoComplete="username"
            />
            {errors.login && <div style={{ color: 'red' }}>{errors.login}</div>}

            <label className="LoginForm-label-psw" htmlFor="password">{t('login.userPsw')}</label>
            <input
                className="LoginForm-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={onInputChange}
                required
                autoComplete="current-password"
            />
            {message && <p style={{ color: 'red' }}>{message}</p>}

            <button type="submit" disabled={waiting}>
                {waiting ? 'Загрузка...' : `${t('login.login')}`}
            </button>

        </form>
    );
};

export default memo(LoginForm);