import React from 'react';
import Item from '../item';
import './style.css';

function List({ list, addItemToBasket = () => { } }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} addItemToBasket={addItemToBasket} />
        </div>
      ))}
    </div>
  );
}

export default React.memo(List);
