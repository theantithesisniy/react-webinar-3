import plural from '../plural';

function formatMonth(month, locale = 'ru-RU') {
	const monthsWithVariants = [
		{ one: 'январь', few: 'января', many: 'января', other: 'января' },
		{ one: 'февраль', few: 'февраля', many: 'февраля', other: 'февраля' },
		{ one: 'март', few: 'марта', many: 'марта', other: 'марта' },
		{ one: 'апрель', few: 'апреля', many: 'апреля', other: 'апреля' },
		{ one: 'май', few: 'мая', many: 'мая', other: 'мая' },
		{ one: 'июнь', few: 'июня', many: 'июня', other: 'июня' },
		{ one: 'июль', few: 'июля', many: 'июля', other: 'июля' },
		{ one: 'август', few: 'августа', many: 'августа', other: 'августа' },
		{ one: 'сентябрь', few: 'сентября', many: 'сентября', other: 'сентября' },
		{ one: 'октябрь', few: 'октября', many: 'октября', other: 'октября' },
		{ one: 'ноябрь', few: 'ноября', many: 'ноября', other: 'ноября' },
		{ one: 'декабрь', few: 'декабря', many: 'декабря', other: 'декабря' }
	];

	const pluralForm = plural(month, monthsWithVariants[month - 1], locale);
	return pluralForm;
}

// Функция для форматирования даты
export default function formatDate(dateString) {
	const date = new Date(dateString);

	// Проверка на валидность даты
	if (isNaN(date)) {
		return 'NaN NaN NaN в NaN:NaN';
	}

	const day = date.getDate(); 
	const month = date.getMonth() + 1; 
	const year = date.getFullYear(); 
	const time = date.toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' }); 

	return `${day} ${formatMonth(month)} ${year} в ${time}`;
}
