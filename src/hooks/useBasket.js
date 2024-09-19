import { useEffect, useState } from 'react';
import { store } from '../index';

function useBasket() {
  const [basket, setBasket] = useState(store.getState().basket);

  useEffect(() => {
    const handleStateChange = () => {
      setBasket(store.getState().basket);
    };
    const unsubscribe = store.subscribe(handleStateChange);
    return () => unsubscribe();
  }, []);

  const basketTotal = store.getBasketTotal();

  const removeItemFromBasket = (code) => {
    const updatedBasket = basket.filter(item => item.code !== code);
    store.setState({ ...store.getState(), basket: updatedBasket });
  };

  return { basket, basketTotal, removeItemFromBasket };
}

export default useBasket;
