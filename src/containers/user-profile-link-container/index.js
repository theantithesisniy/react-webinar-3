import React from 'react';
import useSelector  from '../../hooks/use-selector';
import UserProfileLink from '../../components/user-profile-link';

const UserProfileLinkContainer = () => {
  const select = useSelector(state => ({
    loged: state.user.loged,
    username: state.user.username  
  }));

	return <UserProfileLink loged={select.loged} username={select.username} />;
};  

export default UserProfileLinkContainer;
