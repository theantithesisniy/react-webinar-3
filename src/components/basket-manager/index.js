import { cn as bem } from '@bem-react/classname';
import React from 'react';
import useBasket from '../../hooks/useBasket';
import { formatCurrency, plural } from '../../utils';
import './style.css';

function BasketManager() {
  const { basket, basketTotal } = useBasket();
  const cn = bem('BasketManager');

  return (
    <div className={cn()}>
      {basket.length === 0 ? (
        <p className={cn('emptyBasket')}>
          В корзине: <strong className={cn('emptyBasket', 'text')}>пусто</strong>
        </p>
      ) : (
        <p className={cn('nonEmptyBasket')}>
          В корзине:
          <strong>
            {basket.length} {plural(basket.length, { one: 'товар', few: 'товара', many: 'товаров' })}
            <span> / </span>
            {formatCurrency(basketTotal)}
          </strong>
        </p>
      )}
    </div>
  );
}

export default React.memo(BasketManager);
