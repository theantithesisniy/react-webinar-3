import React from 'react';
import { createPortal } from 'react-dom';
import useBasket from '../../hooks/useBasket';
import { useModal } from '../../hooks/useModal';
import { plural } from '../../utils';
import ModalContent from '../modal-content/index';
import './style.css';

function BasketManager() {
  const { showModal, openModal, closeModal } = useModal();
  const { basket, basketTotal, removeItemFromBasket } = useBasket();

  return (
    <div className="BasketManager">
      {basket.length === 0 ? (
        <p className='BasketManager-emptyBasket'>В корзине: <strong>пусто</strong></p>
      ) : (
        <p className='BasketManager-nonEmptyBasket'>В корзине:
          <strong>
            {basket.length} {plural(basket.length, { one: 'товар', few: 'товара', many: 'товаров' })} /
          </strong>
          <strong>
            {basketTotal} ₽
          </strong>
        </p>
      )}

      <button onClick={openModal}>Перейти</button>
      
      {showModal && createPortal(
        <ModalContent
          onClose={closeModal}
          basket={basket}
          onRemoveItem={removeItemFromBasket}
        />,
        document.body
      )}
    </div>
  );
}

export default React.memo(BasketManager);
