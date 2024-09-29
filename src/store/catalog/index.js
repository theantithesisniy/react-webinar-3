import StoreModule from '../module';

class Catalog extends StoreModule {
  /**
   * Конструктор для создания экземпляра класса Catalog.
   * @param {Object} store - Объект хранилища, который используется для управления состоянием приложения.
   * @param {string} name - Имя модуля.
   */
  constructor(store, name) {
    super(store, name);
  }

  /**
   * Инициализация состояния модуля.
   * @returns {Object} Начальное состояние с пустым списком товаров, 
   * количество товаров равно 0, текущая страница равна 1 и другие параметры.
   */
  initState() {
    return {
      list: [],
      totalItems: 0,
      currentPage: 1,
    };
  }

  /**
   * Загрузка списка товаров из API.
   * @param {number} [page=1] - Номер страницы для загрузки (по умолчанию 1).
   * @returns {Promise<void>} Промис, который разрешается, когда загрузка завершена.
   * @throws {Error} Если произошла ошибка загрузки, будет выброшено исключение.
   */
  async load(page = 1) {
    const limit = 10;
    const skip = (page > 0 ? (page - 1) * limit : 0);

    const params = new URLSearchParams({
      limit: limit,
      skip: skip,
      fields: 'items(_id, title, price),count'
    });

    try {
      const response = await fetch(`/api/v1/articles?${params.toString()}&lang=ru`);

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке товаров: ${response.statusText}`);
      }

      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalItems: json.result.count,
          currentPage: page,
        },
        'Товары загружены',
      );
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
      this.setState({ error: 'Не удалось загрузить товары. Пожалуйста, попробуйте позже.' });
    }
  }

  /**
   * Установка текущей страницы.
   * @param {number} page - Номер страницы.
   * @throws {Error} Если номер страницы меньше 1, будет выброшено исключение.
   */
  setCurrentPage(page) {
    if (page < 1) {
      console.error('Ошибка: номер страницы должен быть больше или равен 1');
      this.setState({ error: 'Номер страницы должен быть больше или равен 1.' });
      return;
    }

    this.setState({ ...this.getState(), currentPage: page });
  }


}

export default Catalog;