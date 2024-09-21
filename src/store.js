import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      basket: []
    };

    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Добавление записи по коду в корзину
   * @param code
   */
  addItemToBasket(code) {
    const item = this.state.list.find(item => item.code === code);

    if (item) {
      const basketItem = this.state.basket.find(basketItem => basketItem.code === code);

      if (basketItem) {
        // Если товар уже есть в корзине, увеличиваем его количество
        this.setState({
          ...this.state,
          basket: this.state.basket.map(basketItem =>
            basketItem.code === code
              ? { ...basketItem, quantity: basketItem.quantity + 1 }
              : basketItem
          )
        });
      } else {
        // Если товара еще нет в корзине, добавляем его с количеством 1
        this.setState({
          ...this.state,
          basket: [...this.state.basket, { ...item, quantity: 1 }]
        });
      }
    }
  }

  /**
   * Общая стоимость товаров в корзине
   * @param getBasketTotal
   */
  getBasketTotal() {
    return this.state.basket.reduce((sum, item) => {
      // Приведение цены к числу, если это не число.
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + price * quantity;
    }, 0);
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
