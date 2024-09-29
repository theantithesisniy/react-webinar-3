import { cn as bem } from '@bem-react/classname';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head/index';
import { useLanguage } from '../../components/language-context';
import MainMenu from '../../components/main-menu';
import PageLayout from '../../components/page-layout';
import ProductItemDetails from '../../components/product-Item-details';
import Loader from '../../components/ui/index';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import { translations } from '../../translations';
import Controls from '../../components/controls'
import './style.css';

const ProductPage = (props) => {
  const { headTitle = '', onOpen, amount = 0, sum = 0 } = props;
  const { id } = useParams();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const cn = bem('ProductPage');
  const { language } = useLanguage();

  const select = useSelector(state => ({
    description: state.productItemStore.description,
    titleCountry: state.productItemStore.titleCountry,
    releaseYear: state.productItemStore.releaseYear,
    category: state.productItemStore.category,
    price: state.productItemStore.price,
  }));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await store.actions.productItemStore.loadProductById(id);
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
    <PageLayout>
      <Head title={headTitle} texts={translations[language]}/>
      <div className={cn('header')}>
        <MainMenu texts={translations[language]} />
        <BasketTool
          texts={translations[language]}
          onOpen={onOpen}
          amount={amount}
          sum={sum} />
      </div>

      <ProductItemDetails
        description={select.description}
        titleCountry={select.titleCountry}
        category={select.category}
        releaseYear={select.releaseYear}
        price={select.price}
        texts={translations[language]}
        language={language} />
      <Controls className={cn('controls')} onAdd={callbacks.onAdd} texts={translations[language]}/>
    </PageLayout>
  );
};

export default ProductPage;