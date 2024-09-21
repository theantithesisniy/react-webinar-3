import React, { useCallback, useEffect, useState } from 'react';
import BasketManager from './components/basket-manager';
import BasketButton from './components/basket-button';
import Head from './components/head/index';
import List from './components/list/index';
import ModalLayout from './components/modal-layout/index';
import PageLayout from './components/page-layout/index';
import useBasket from './hooks/useBasket';
import { useModal } from './hooks/useModal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const [list, setList] = useState(store.getState().list);
  const { basket } = useBasket();
  const {showModal, openModal, closeModal} = useModal();

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
      <ModalLayout >
        <BasketManager />
        <BasketButton
          showModal={showModal}
          openModal={openModal}
          closeModal={closeModal}
          basket={basket}
        />
      </ModalLayout>
      <List list={list} basket={basket} type='list' addItemToBasket={addItemToBasket} />
    </PageLayout>
  );
}

export default App;
