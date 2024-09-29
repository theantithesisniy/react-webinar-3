import StoreModule from '../module';

class ProductItemStore extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      title: '',
      description: '',
      titleCountry: '',
      releaseYear: '',
      category: '',
      price: 0,
      error: null,
    };
  }
  /**
   * Загрузка информации о товаре по его ID.
   * @param {string} id - Идентификатор товара.
   * @returns {Promise<Object|null>} Промис, который разрешается объектом товара или null в случае ошибки.
   * @throws {Error} Если произошла ошибка загрузки, будет выброшено исключение.
   */

  async loadProductById(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=ru`);

      if (!response.ok) {
        throw new Error(`Ошибка при получении товара: ${response.statusText}`);
      }

      const product = await response.json();
      this.setState(
        {
          title: product.result.title,
          description: product.result.description,
          titleCountry: product.result.madeIn.title,
          releaseYear: product.result.edition,
          category: product.result.category.title,
          price: product.result.price,
        },
        'Товар загружен',
      );

      return product.result;
    } catch (error) {
      console.error('Ошибка загрузки товара:', error);
      this.setState({ error: 'Не удалось загрузить товар. Пожалуйста, проверьте ID и попробуйте снова.' });
      return null;
    }
  }

  // Метод для сброса состояния при необходимости
  resetProduct() {
    this.setState(this.initState());
  }
}

export default ProductItemStore;