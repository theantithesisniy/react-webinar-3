import { cn as bem } from '@bem-react/classname';
import React, { memo } from 'react';
import './style.css';

function UserLayout({ children }) {
	const cn = bem('UserLayout');
	return (
		<div className={cn()}>
			{children}
		</div>
	);
}

export default memo(UserLayout);
