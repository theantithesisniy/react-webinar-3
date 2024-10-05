import { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginButton() {
	const store = useStore();
	const navigate = useNavigate();
	const location = useLocation();
	const select = useSelector(state => ({
		loged: state.user.loged
	}));
	const { t } = useTranslate();
	const handleLogout = () => {
		store.actions.user.logout();
		navigate('/');
	};

	return (
		<>
			{select.loged ? (
				<Link className='LoginButton'>
					<button onClick={handleLogout}>{t('login.exit')}</button>
				</Link>
			) : (
				<Link
					className='LoginButton'
					to='/login'
					state={{ from: location }}
				>
					<button>{t('login.login')}</button>
				</Link>
			)}
		</>
	);
}

export default memo(LoginButton);
