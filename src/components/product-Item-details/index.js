import { cn as bem } from '@bem-react/classname';
import { translations } from '../../translations';
import './style.css';

const ProductItemDetails = (props) => {
  const {
    description,
    titleCountry,
    category,
    releaseYear,
    price,
    texts
   } = props;
  const cn = bem('ProductItemDetails');
  return (
    <div className={cn('')}>
      <p className={cn('description')}>{texts.productDescription}: {description}</p>
      <p className={cn('titleCountry')}>{texts.manufacturersCountry}: {titleCountry}</p>
      <p className={cn('category')}>{texts.category}: {category}</p>
      <p className={cn('releaseYear')}>{texts.releaseYear}: <strong>{releaseYear}</strong></p>
      <p className={cn('price')}><strong>{texts.price}: {price} ₽</strong></p>
    </div>
  );
};

export default ProductItemDetails;