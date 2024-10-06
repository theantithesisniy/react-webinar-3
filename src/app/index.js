import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../containers/require-auth';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
import UserProfile from './user-profile';

function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeUser() {
      await store.actions.user.init();
      setLoading(false);
    }
    initializeUser();
  }, [store.actions.user]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        } />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
