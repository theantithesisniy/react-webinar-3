import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../../translations';
import { numberFormat } from '../../utils';
import { useLanguage } from '../language-context';

import './style.css';

function Item({ item, onAdd, link, texts }) {
  const cn = bem('Item');
  const { language } = useLanguage();

  const { _id, title, price } = item;

  const itemLink = link || `/articles/${_id}`;
  const handleAdd = (e) => onAdd(_id);

  return (
    <div className={cn()}>
      <Link to={itemLink} className={cn('title')}>
        {title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(price)} ₽</div>
        <button className={cn('btn')} onClick={handleAdd}>
          {texts.addItem}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  link: PropTypes.string, 
};

Item.defaultProps = {
  onAdd: () => {},
  link: '', 
};

export default memo(Item);