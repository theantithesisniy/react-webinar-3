import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import Item from '../item';
import './style.css';

function List(props) {
  const { list = [], basket = [], type = '', addItemToBasket = () => {} } = props;
  const items = type === 'basket' ? basket : list;
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            type={type}
            addItemToBasket={type === 'basket' ? undefined : addItemToBasket}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array,
  basket: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  addItemToBasket: PropTypes.func,
};

export default React.memo(List);
