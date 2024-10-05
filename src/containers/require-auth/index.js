import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';
import useSelector from '../../hooks/use-selector';

const RequireAuth = ({ children }) => {
	const isLoggedIn = useSelector(state => state.user.loged);
	const navigate = useNavigate();
	useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); 
    }
	}, [isLoggedIn, navigate])

	return children;
};

export default RequireAuth;
