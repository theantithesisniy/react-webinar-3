import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool(props) {
  const { sum, amount, onOpen, texts } = props;
  const cn = bem('BasketTool');

  return (
    <div className={cn('')}>
      <div className={cn('content')}>
        <span className={cn('label')}>{texts.basketLabel}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: texts.itemOne,
              few: texts.itemFew,
              many: texts.itemMany,
            })} / ${numberFormat(sum)} ₽`
            : texts.empty}
        </span>
        <button onClick={onOpen}>
          {texts.goToBasket}
        </button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
};

 export default memo(BasketTool);
