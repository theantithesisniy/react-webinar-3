import { cn as bem } from '@bem-react/classname';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../components/language-context';
import Loader from '../../components/ui/index'; 
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../translations';
import './style.css';

const ProductPage = (props) => {
  const { id } = useParams();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const cn = bem('ProductPage');
  const { language } = useLanguage();

  const select = useSelector(state => ({
    description: state.catalog.description,
    titleCountry: state.catalog.titleCountry,
    releaseYear: state.catalog.releaseYear,
    category: state.catalog.category,
    price: state.catalog.price,
  }));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await store.actions.catalog.loadById(id);
      setLoading(false);
    };

    loadData();
  }, [id, store]);

  const callbacks = {
    onAdd: () => props.onAdd(id),
  };

  if (loading) {
    return <div className={cn('loaderWrapper')}>
      <Loader />
    </div>
  }

  if (!select.price) {
    return <p>Продукт не найден.</p>;
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{translations[language].productDescription}: {select.description}</p>
      <p className={cn('titleCountry')}>{translations[language].manufacturersCountry}: {select.titleCountry}</p>
      <p className={cn('category')}>{translations[language].category}: {select.category}</p>
      <p className={cn('releaseYear')}>{translations[language].releaseYear}: <strong>{select.releaseYear}</strong></p>
      <p className={cn('price')}><strong>{translations[language].price}: {select.price} ₽</strong> </p>
      <button className={cn('addButton')} onClick={callbacks.onAdd}>{translations[language].addItem}</button>
    </div>
  );
};

export default ProductPage;