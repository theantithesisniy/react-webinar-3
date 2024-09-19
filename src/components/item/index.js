import React from 'react';
import { formatCurrency } from '../../utils';
import './style.css';

function Item(props) {
  const { item = { code: 0, title: '', price: 0 }, addItemToBasket } = props;

  const callbacks = {
    addItemToBasket: e => {
      e.stopPropagation();
      addItemToBasket(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div>{formatCurrency(item.price)}</div>
      <div className="Item-actions">
        <button onClick={callbacks.addItemToBasket}>Добавить</button>
      </div>
    </div>
  );
}

export default React.memo(Item);
