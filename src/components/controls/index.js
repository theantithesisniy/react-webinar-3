import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function Controls({ onAdd, texts, className }) {
  return (
    <div className={className}>
      <button onClick={() => onAdd()}>{texts.addItem}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => { },
};

export default memo(Controls);
