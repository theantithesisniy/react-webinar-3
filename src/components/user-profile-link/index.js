import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
const UserProfileLink = ({ loged, username }) => {

  if (!loged) {
    return null;
  }

  return (
    <Link to="/profile" className="user-profile-link">
      {username}
    </Link>
  );
};

UserProfileLink.propTypes = {
  loged: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

export default UserProfileLink;