import React, { useCallback, useEffect, useState } from 'react';
import BasketManager from './components/basket-manager';
import Head from './components/Head';
import List from './components/List';
import PageLayout from './components/page-layout/index';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [list, setList] = useState(store.getState().list);


  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setList(store.getState().list);
    });
    return () => unsubscribe();
  }, [store]);

  const addItemToBasket = useCallback(
    code => {
      store.addItemToBasket(code);
    },
    [store]
  );

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketManager />
      <List list={list} addItemToBasket={addItemToBasket} />
    </PageLayout>
  );
}

export default App;
