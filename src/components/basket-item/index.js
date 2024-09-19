import React from 'react';
function BasketItem({ item, onRemove }) {
  return (
    <div key={item.code} className='Item-content'>
      <div className={'Item Dashed'}>
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}</div>
        <div className='Item-price'>{item.price} ₽</div>
        <div className='Item-quantity'>{item.quantity} шт.</div>
        <div className="Item-actions">
          <button className='Item-actions-btn' onClick={() => onRemove(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BasketItem)