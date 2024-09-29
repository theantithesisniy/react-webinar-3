import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../components/language-context';
import useSelector from '../store/use-selector';
import Basket from './basket';
import Main from './main';
import { Routes, Route } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/articles/:id' element={<Main/>}/>
        </Routes>
        {activeModal === 'basket' && <Basket />}
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
