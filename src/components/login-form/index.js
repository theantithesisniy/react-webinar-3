import { useEffect, useState } from "react";
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import './style.css';

export default function LoginForm() {
    const store = useStore();
    const select = useSelector(state => ({
        loged: state.user.loged,
        waiting: state.user.waiting,
        username: state.user.username,
        errorMessage: state.user.errorMessage  
    }));

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [attemptedLogin, setAttemptedLogin] = useState(false); // Флаг попытки авторизации

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setAttemptedLogin(true);
        await store.actions.user.login(formData);
    };

    useEffect(() => {
        if (select.loged) {
            setMessage('Вы успешно вошли в систему!');
            setFormData({
                login: '',
                password: ''
            });
        } else if (attemptedLogin && !select.waiting && select.errorMessage) {
            setMessage(select.errorMessage || 'Ошибка при авторизации');
        }
    }, [select.loged, select.waiting, select.errorMessage, attemptedLogin]);

    // Сбрасываем сообщение через 5 секунд, если оно установлено  
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <form className='LoginForm' onSubmit={handleSubmit} method="post">
            <h4 className='LoginForm-header'>Вход</h4>
            <label htmlFor="login"><b>Логин</b></label>
            <input  
                type="text"
                className='LoginForm-login'
                name="login"
                value={formData.login}
                onChange={handleInputChange}
                required  
                autoComplete="username"
            />

            <label htmlFor="password"><b>Пароль</b></label>
            <input  
                type="password"
                className='LoginForm-psw'
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required  
                autoComplete="current-password" 
            />

            <button type="submit" disabled={select.waiting}>
                {select.waiting ? 'Загрузка...' : 'Войти'}
            </button>

            {message && <p style={{ color: 'red' }}>{message}</p>}
        </form>
    );
}