const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Плюрализация слова "раз" в зависимости от числового значения
 * @param count {Number} Число, определяющее форму слова
 * @param word {String} Базовое слово, которое будет изменяться (например, "раз")
 * @param endings {Array<String>} Список окончаний для множественной формы (по умолчанию ['а'])
 * @returns {String} Возвращает слово в правильной форме: "раз" или "раза"
 */

export function pluralize(count, word, endings = ['а']) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return word;
  }

  if (lastDigit === 1) {
    return word;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return word + endings[0];
  }

  return word;
}