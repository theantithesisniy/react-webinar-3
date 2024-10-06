import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import LoginButton from '../../components/login-button';

function LoginButtonContainer() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loged } = useSelector(state => ({
    loged: state.user.loged,
  }));
  
  const { t } = useTranslate();

  const handleLogout = () => {
    store.actions.user.logout();
    navigate('/');
  };

  return (
    <LoginButton loged={loged} onLogout={handleLogout} t={t} location={location} />
  );
}

export default memo(LoginButtonContainer);
