/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Функция для построения дерева категорий
 * @param {Array} categories - Исходный массив категорий
 * @return {Array} - Дерево категорий
 */
export function buildCategoryTree(categories) {
  const map = {};
  const roots = [];

  categories.items.forEach(category => {
    map[category._id] = { ...category, children: [] }; // Создаем объект категории с массивом подкатегорий
  });

  categories.items.forEach(category => {
    if (category.parent) {
      map[category.parent._id].children.push(map[category._id]);
    } else {
      roots.push(map[category._id]); // Родительские категории добавляем в корень
    }
  });

  return roots;
}