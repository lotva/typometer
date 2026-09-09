export default defineI18nLocale(async () => {
	return {
		controls: {
			ariaLabel: 'Настройка типографической шкалы',
			base: {
				label: 'Основа',
				max: 'Максимум',
				min: 'Минимум',
			},
			decreaseNamed: 'Уменьшить: {name}',
			decreaseValue: 'Уменьшить',
			grid: 'Привязать к модулю',
			gridDescription:
				'Все значения типографической шкалы будут кратны введённому значению модуля',
			gridStep: 'Шаг модуля, {unit}',
			hotkeyHint: 'Горячая клавиша {key}',
			increaseNamed: 'Увеличить: {name}',
			increaseValue: 'Увеличить',
			presets: 'Пресеты',
			px: 'пк',
			ratio: {
				label: 'Множитель',
				max: 'Максимальный множитель',
				min: 'Минимальный множитель',
			},
			steps: 'Промежуточные шаги',
			viewport: {
				label: 'Ширина окна',
				max: 'Максимальная ширина',
				min: 'Минимальная ширина',
			},
		},
		copied: 'Скопировано',
		copyright: {
			ariaLabel: 'Об авторе и ссылки',
			projects: 'Проекты',
			sourceCode: 'Исходный код',
			text: 'Разработал Денис Налитов',
		},
		description: 'Составляет типографическую шкалу в виде ЦСС-токенов',
		languages: {
			en: 'English',
			ru: 'Русский',
		},
		loading: 'Загрузка...',
		outputFormat: {
			label: 'Формат токенов',
			numeric: 'Числовой',
			semantic: 'Семантический',
			tshirt: 'XS—XL',
		},
		panel: {
			collapse: 'Свернуть панель',
			expand: 'Раскрыть панель',
		},
		presets: {
			classic: 'Классическая шкала из книги «Основы стиля в типографике»',
			geist: 'Дизайн-система Geist',
			majorThird: 'Большая терция',
			musicalTetratonic: 'Музыкальная тетратоника',
			musicalTrinonic: 'Музыкальная трихотоника',
			polaris: 'Shopify Polaris',
			spectrum: 'Adobe Spectrum',
		},
		preview: {
			ariaLabel: 'Предпросмотр шкалы и копирование токенов',
			copy: 'Скопировать',
			copyCss: 'Скопировать CSS',
			currentViewportWidth: 'Текущая ширина окна',
			generatedTokens: 'Сгенерированные CSS-токены',
			probeLegend:
				'В каждой строке размеры шрифта указаны для мобильного, текущего и десктопного окна — в таком порядке.',
			probeSizesAria:
				'Мобильная {mobile}, текущая {current}, десктоп {desktop}',
			scale: 'Шкала',
			scaleTableCaption: 'Типографическая шкала при разной ширине окна',
			tokens: 'Токены',
		},
		switchLanguage: 'Смена языка',
		title: 'Типометр',
	}
})
