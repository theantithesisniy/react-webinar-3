import { cn as bem } from '@bem-react/classname';
import React from 'react';
import './style.css';

function PageLayout({ children = null }) {  // если бы использовали typescript, то { children = null as React.ReactNode }
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

export default React.memo(PageLayout);
