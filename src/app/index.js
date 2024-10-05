import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../containers/require-auth';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
import UserProfile from './user-profile';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */

function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();

  useEffect(() => {
    store.actions.user.init()
  }, [store.actions.user])

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
