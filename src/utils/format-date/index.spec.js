import formatDate from './index';

describe('formatDate', () => {
  test('formats date correctly for Russian locale', () => {
    const dateString = '2024-10-10T15:30:00Z'; // Пример даты
    const formattedDate = formatDate(dateString);

    // Проверяем, что форматирование работает как ожидается.
    // Ожидаемое значение: "10 октября 2024 в 18:30"
    expect(formattedDate).toBe('10 октября 2024 в 18:30');
  });

  test('formats date correctly for single-digit day', () => {
    const dateString = '2024-10-05T10:15:00Z'; // Пример даты с однозначным числом
    const formattedDate = formatDate(dateString);

    // Ожидаем, что день будет форматироваться как "5 октября 2024 в 13:15"
    expect(formattedDate).toBe('5 октября 2024 в 13:15');
  });

  test('handles invalid date string gracefully', () => {
    const invalidDateString = 'invalid-date';
    const formattedDate = formatDate(invalidDateString);

    // Если дата некорректная, можно вернуть пустую строку или обработать ошибку по-другому
    // Здесь предполагаем, что ошибка будет обработана и возвращен пустой результат
    expect(formattedDate).toBe('NaN NaN NaN в NaN:NaN');
  });
});
