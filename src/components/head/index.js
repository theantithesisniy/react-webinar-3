import PropTypes from 'prop-types';
import { memo } from 'react';
import { useLanguage } from '../../components/language-context/index';
import './style.css';

function Head({ title = '', texts = '' }) {
  const { toggleLanguage } = useLanguage()

  return (
    <div className="Head">
      <h1>{title}</h1>
      <button onClick={toggleLanguage}>
        {texts.changeLanguage}
      </button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
