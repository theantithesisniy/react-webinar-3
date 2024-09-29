import { cn as bem } from '@bem-react/classname';
import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import Item from '../../components/item';
import { useLanguage } from '../../components/language-context';
import List from '../../components/list';
import MainMenu from '../../components/main-menu';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../translations';
import Pagination from '../pagination';
import ProductPage from '../product-page';
import './style.css';

const Main = () => {
  const store = useStore();
  const { language } = useLanguage();
  const { id } = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list.slice(0, 10), 
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalItems: state.catalog.totalItems,
    currentPage: state.catalog.currentPage,
    title: state.productItemStore.title,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  }, [store, select.currentPage]); 

  const totalPages = Math.ceil(select.totalItems / 10);
  const cn = bem('Main');

  const addToBasket = useCallback(_id => store.actions.basket.addToBasket(_id), [store]);
  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);
  const changePage = useCallback(page => store.actions.catalog.setCurrentPage(page), [store]);
  const renderItem = item => (
    <Item
      key={item._id}
      item={item}
      onAdd={addToBasket}
      addItemLabel={translations[language].addItem}
      link={`/articles/${item._id}`}
      texts={translations[language]}
    />
  );

  return (
    <PageLayout>
      {!id ? (
        <>
          <Head texts={translations[language]} title="Магазин" />
          <div className={cn('header')}>
            <MainMenu texts={translations[language]} />
            <BasketTool
              onOpen={openModalBasket}
              amount={select.amount}
              sum={select.sum}
              texts={translations[language]}
            />
          </div>
          <List list={select.list} renderItem={renderItem} />
          <Pagination
            currentPage={select.currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      ) : (
        <ProductPage
          headTitle={select.title}
          onAdd={addToBasket}
          onOpen={openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      )}
    </PageLayout>
  );
};

export default memo(Main);
