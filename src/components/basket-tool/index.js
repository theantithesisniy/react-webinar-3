import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { numberFormat, plural } from '../../utils';
import { useLanguage } from '../language-context';
import { translations } from '../../translations'; 
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { language } = useLanguage();

  return (
    <div className={cn('')}>
      <Link to='/' className={cn('link')}>
        {translations[language].main}
      </Link>
      <div className={cn('content')}>
        <span className={cn('label')}>{translations[language].basketLabel}:</span> 
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: translations[language].itemOne,
              few: translations[language].itemFew,
              many: translations[language].itemMany,
            })} / ${numberFormat(sum)} ₽`
            : translations[language].empty}
        </span>
        <button onClick={onOpen}>
          {translations[language].goToBasket}
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
