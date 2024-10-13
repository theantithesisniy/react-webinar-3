/**
 * Преобразование списка в иерархию и плоский список.
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Плоский массив узлов
 */
export default function listToTree(list, key = '_id') {
  let trees = {};
  let roots = [];
  let flatList = []; // Новый массив для плоского списка

  for (const item of list) {
    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = { ...item, children: [] }; // Создаем объект с пустым массивом children
      flatList.push(trees[item[key]]); // Добавляем элемент в плоский массив
    } else {
      trees[item[key]] = { ...trees[item[key]], ...item }; // Обновляем существующий элемент
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent?.[key]) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent[key]]) {
        trees[item.parent[key]] = { children: [] };
      }
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
    } else {
      // Если у элемента нет родителя, добавляем его в корни
      roots.push(trees[item[key]]);
    }
  }

  return flatList; // Возвращаем плоский массив
}
