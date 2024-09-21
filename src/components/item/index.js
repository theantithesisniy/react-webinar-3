import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import useBasket from '../../hooks/useBasket';
import { formatCurrency } from '../../utils';
import './style.css';

/**
  * Компонент `Item` представляет товар в списке или корзине. 
  * В зависимости от переданного `type` рендерит разметку для списка товаров или для корзины.
 */

function Item(props) {
  const {
    item = { code: 0, title: '', price: 0, quantity: 1 },
    addItemToBasket = () => {},
    type = '',
  } = props;

  const { removeItemFromBasket } = useBasket();
  const cn = bem('Item');

  const callbacks = {
    addItemToBasket: (e) => {
      e.stopPropagation();
      addItemToBasket(item.code);
    }
  };

  if (type === 'basket') {
    return (
      <div className={cn('content')}>
        <div className={cn({ Dashed: true })}>
          <div className={cn('code')}>{item.code}</div>
          <div className={cn('title')}>{item.title}</div>
          <div className={cn('price')}>{formatCurrency(item.price)}</div>
          <div className={cn('quantity')}>{item.quantity} шт.</div>
          <div className={cn('actions')}>
            <button className={cn('actions-btn')} onClick={() => removeItemFromBasket(item.code)}>Удалить</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={cn()}>
        <div className={cn('code')}>{item.code}</div>
        <div className={cn('title')}>{item.title}</div>
        <div>{formatCurrency(item.price)}</div>
        <div className={cn('actions')}>
          <button onClick={callbacks.addItemToBasket}>Добавить</button>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
  }),
  addItemToBasket: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default React.memo(Item);
