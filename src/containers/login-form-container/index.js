import { useEffect, useState, memo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import LoginForm from '../../components/login-form';
import useTranslate from '../../hooks/use-translate';
import debounce from 'lodash.debounce';

const LoginFormContainer = () => {
    const store = useStore();
    const { loged, waiting, errorMessage } = useSelector(state => ({
        loged: state.user.loged,
        waiting: state.user.waiting,
        errorMessage: state.user.errorMessage  
    }));

    const [formData, setFormData] = useState({ login: '', password: '' });
    const [message, setMessage] = useState('');
    const [attemptedLogin, setAttemptedLogin] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';
    const { t } = useTranslate();

    const debouncedNavigate = useRef(
        debounce((path) => navigate(path, { replace: true }), 100)
    ).current;

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setAttemptedLogin(true);
        setErrors({});

        const newErrors = {};
        if (!formData.login || formData.login.length < 3) newErrors.login = 'Логин должен содержать не менее 3 символов';
        if (!formData.password || formData.password.length < 6) newErrors.password = 'Пароль должен содержать не менее 6 символов';
        
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        await store.actions.user.login(formData);
    };

    useEffect(() => {
        if (loged) {
            setMessage('Вы успешно вошли в систему!');
            setFormData({ login: '', password: '' });
            debouncedNavigate(from);
        } else if (attemptedLogin && !waiting && errorMessage) {
            setMessage(errorMessage || 'Ошибка при авторизации');
        }
    }, [loged, waiting, errorMessage, attemptedLogin, from, debouncedNavigate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <LoginForm  
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            waiting={waiting}
            message={message}
            errors={errors}
            t={t}
        />
    );
};

export default memo(LoginFormContainer);