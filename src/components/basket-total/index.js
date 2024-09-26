import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useLanguage } from '../../components/language-context';
import { translations } from '../../translations';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal');
  const { language } = useLanguage();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations[language].basketTotal}:</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
