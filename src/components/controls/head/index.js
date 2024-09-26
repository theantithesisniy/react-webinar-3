import PropTypes from 'prop-types';
import { memo } from 'react';
import { translations } from '../../../translations';
import { useLanguage } from '../../language-context';
import './style.css';

function Head({ titleKey }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="Head">
      <h1>{translations[language][titleKey]}</h1>
      <button onClick={toggleLanguage}>
        {translations[language].changeLanguage}
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
