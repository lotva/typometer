export default defineI18nLocale(async () => {
	return {
		controls: {
			ariaLabel: 'Настройка типографической шкалы',
			base: 'Основа',
			em: 'em',
			formula: 'Формула',
			grid: 'Привязать к модулю',
			gridDescription:
				'Все значения типографической шкалы будут кратны введённому значению модуля',
			presets: 'Пресеты',
			px: 'пк',
			ratio: 'Множитель',
			steps: 'Промежуточные шаги',
			unit: {
				em: 'Эмы',
				label: 'Единица измерения',
				pixel: 'Пиксели',
			},
		},
		copied: 'Скопировано',
		copyright: {
			projects: 'Проекты',
			sourceCode: 'Исходный код',
			text: 'Разработал Денис Налитов',
		},
		description: 'Составляет типографическую шкалу в виде ЦСС-токенов',
		outputFormat: {
			label: 'Формат токенов',
			numeric: 'Числовой',
			semantic: 'Семантический',
			tshirt: 'XS—XL',
		},
		presets: {
			carbon: 'Дизайн-система Carbon',
			classic: 'Классическая шкала из книги «Основы стиля в типографике»',
			geist: 'Дизайн-система Geist',
			kontur: 'Гайды «Контура»',
			lowContrast: 'Пониженный контраст кеглей',
			musicalTetratonic: 'Музыкальная тетратоника',
			musicalTrinonic: 'Музыкальная трихотоника',
		},
		preview: {
			ariaLabel: 'Предпросмотр шкалы и копирование токенов',
			example: 'Превью',
			scale: 'Шкала',
			tokens: 'Токены',
		},
		switchLanguage: 'Смена языка',
		title: 'Типометр',
	}
})
