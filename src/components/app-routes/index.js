import { Routes, Route } from 'react-router-dom';
import Head from '../../components/controls/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../app/pagination/index';
import ProductPage from '../../app/product-page/index';
import Item from '../../components/item';

const AppRoutes = ({ callbacks, select, totalPages, language, translations }) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Head titleKey="shopTitle" />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              basketLabel={translations[language].basketLabel} 
            />
            <List
              list={select.list}
              renderItem={item => (
                <Item
                  item={item}
                  onAdd={callbacks.addToBasket}
                  addItemLabel={translations[language].addItem} 
                />
              )}
            />
            <Pagination
              currentPage={select.currentPage}
              totalPages={totalPages}
              onPageChange={callbacks.changePage}
            />
          </>
        }
      />
      <Route
        path="/:id"
        element={
          <>
            <Head titleKey="productTitle" />
            <BasketTool
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <ProductPage onAdd={callbacks.addToBasket} />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
