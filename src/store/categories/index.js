import StoreModule from '../module';
import { buildCategoryTree } from '../../utils';
/**
 * Состояние категорий 
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      categories: [],
      errorMessage: '',
      loading: false,
    };
  }

  async fetchCategories() {
    this.setState({ loading: true });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*&lang=ru');

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      const categories = buildCategoryTree(json.result);

      this.setState({
        categories,
        errorMessage: '',
        loading: false,
      }, 'Загружены категории');
    } catch (error) {
      console.error('Не удалось загрузить категории:', error);

      this.setState({
        categories: [],
        loading: false,
        errorMessage: error.message || 'Не удалось загрузить категории',
      }, 'Ошибка при загрузке категорий');
    }
  }
}

export default CategoriesState;