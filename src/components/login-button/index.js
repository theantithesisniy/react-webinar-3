import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function LoginButton({ loged, onLogout, t, location }) {
  return (
    <>
      {loged ? (
        <Link className='LoginButton'>
          <button onClick={onLogout}>{t('login.exit')}</button>
        </Link>
      ) : (
        <Link className='LoginButton' to='/login' state={{ from: location }}>
          <button>{t('login.login')}</button>
        </Link>
      )}
    </>
  );
}

LoginButton.propTypes = {
  loged: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default memo(LoginButton);
