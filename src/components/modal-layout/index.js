import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

function ModalLayout({ children = null }) {
	const cn = bem('ModalLayout');


	return (
		<div className={cn()}>
			{children}
		</div>
	);
}

ModalLayout.propTypes = {
	children: PropTypes.node,
}

export default React.memo(ModalLayout);
