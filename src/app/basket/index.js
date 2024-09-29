import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BasketTotal from '../../components/basket-total';
import ItemBasket from '../../components/item-basket';
import { useLanguage } from '../../components/language-context';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../translations';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return (
          <ItemBasket
            texts={translations[language]}
            link={`/articles/${item._id}`}
            item={item}
            onRemove={callbacks.removeFromBasket}
            onLinkClick={handleLinkClick(`/articles/${item._id}`)} />
        );
      },
      [callbacks.removeFromBasket],
    ),
  };
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLinkClick = (link) => (e) => {
    e.preventDefault();
    callbacks.closeModal();
    navigate(link)
  }

  return (
    <ModalLayout texts={translations[language]} titleKey="modalTitle" onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal texts={translations[language]} sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
