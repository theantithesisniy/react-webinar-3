import React from 'react';
import { Link } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

const UserProfileLink = () => {
  const select = useSelector(state => ({
    loged: state.user.loged,
    username: state.user.username  
  }));

  if (!select.loged) {
    return null; 
  }

  return (
    <Link to="/profile" className="user-profile-link">
      {select.username}
    </Link>
  );
};

export default UserProfileLink;