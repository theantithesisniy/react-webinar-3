import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';
import { formatCurrency } from '../../utils';
import List from '../list/index';
import './styles.css';

function ModalContent(props) {
  const { onClose = () => {}, basket = [] } = props;
  const cn = bem('ModalContent');

  return (
    <>
      <div className={cn('overlay')} onClick={onClose}></div>
      <div className={cn('modal')}>
        <div className={cn('modal-content')}>
          <div className={cn('modal-header')}>
            <h2>Корзина</h2>
            <button className={cn('modal-btn')} onClick={onClose}>
              Закрыть
            </button>
          </div>

          <div className={cn('modal-items')}>
            {basket.length > 0 ? (
              <List type='basket' basket={basket} />
            ) : (
              <p className={cn('empty-basket')}>В корзине: <strong>пусто</strong></p>
            )}
          </div>

          {basket.length > 0 && (
            <div className={cn('modal-price')}>
              <p className={cn('label')}>Итого</p>
              <p className={cn('amount')}>
                {formatCurrency(
                  basket.reduce((sum, item) => {
                    const price = parseFloat(item.price) || 0;
                    const quantity = parseInt(item.quantity, 10) || 0;
                    return sum + price * quantity;
                  }, 0)
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  basket: PropTypes.array.isRequired,
};

export default React.memo(ModalContent);
