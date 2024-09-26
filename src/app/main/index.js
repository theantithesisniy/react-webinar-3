import { memo, useCallback, useEffect } from 'react';
import AppRoutes from '../../components/app-routes';
import { useLanguage } from '../../components/language-context';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../translations';

const Main = () => {
  const store = useStore();
  const { language } = useLanguage();
  useEffect(() => {
    store.actions.catalog.load(store.getState().catalog.currentPage);
  }, [store.getState().catalog.currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    changePage: useCallback(page => store.actions.catalog.setCurrentPage(page), [store]),
  };

  const totalPages = Math.ceil(select.totalItems / 10);

  return (
    <PageLayout>

      <AppRoutes
        callbacks={callbacks}
        select={select}
        totalPages={totalPages}
        language={language}
        translations={translations}
      />

    </PageLayout>
  );
};

export default memo(Main);
