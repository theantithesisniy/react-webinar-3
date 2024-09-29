import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function MainMenu({ texts }) {
  const cn = bem('MainMenu');

  return (
    <nav className={cn('')}>
      <Link to='/' className={cn('link')}>
        {texts.main}
      </Link>
    </nav>
  );
}

export default MainMenu;
