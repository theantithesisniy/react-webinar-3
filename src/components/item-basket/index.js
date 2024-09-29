import { cn as bem } from '@bem-react/classname';
import { default as propTypes, default as PropTypes } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat } from '../../utils';
import './style.css';

function ItemBasket({ item,onRemove, link, onLinkClick, texts }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(_id),
  };

  const { _id, title, price, amount } = item;

  const itemLink = link || `/articles/${_id}`;
  return (
    <div className={cn()}>
      <Link to={itemLink} onClick={onLinkClick} className={cn('title')}>{title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(amount || 0)} {texts.amountItem}.</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{texts.delItem}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => { },
};

export default memo(ItemBasket);
