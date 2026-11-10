;(function initTheme() {
	const savedTheme = localStorage.getItem('theme')

	if (savedTheme === 'dark' || savedTheme === 'light') {
		setTheme(savedTheme)
	} else {
		setTheme('auto')
	}
})()

document.addEventListener('DOMContentLoaded', () => {
	const currentTheme = document.documentElement.classList.contains('theme-dark')
		? 'dark'
		: document.documentElement.classList.contains('theme-light')
			? 'light'
			: 'auto'

	const themeButtons = [
		...document.querySelectorAll('.header__theme-menu-button'),
	]

	setActiveButton(themeButtons, currentTheme)

	themeButtons.forEach(button => {
		button.addEventListener('click', () => {
			const chosenTheme = [...button.classList]
				.find(className => className.includes('_type_'))
				.split('_type_')[1]

			setTheme(chosenTheme)
			setActiveButton(themeButtons, chosenTheme)
		})
	})
})

function setTheme(theme) {
	document.documentElement.classList.remove('theme-dark', 'theme-light')

	if (theme === 'dark' || theme === 'light') {
		document.documentElement.classList.add(`theme-${theme}`)
	}

	localStorage.setItem('theme', theme)
}

function setActiveButton(buttonsArray, theme) {
	buttonsArray.forEach(button => {
		button.classList.remove('header__theme-menu-button_active')
		button.removeAttribute('disabled')
	})

	const target = buttonsArray.find(button =>
		button.classList.contains(`header__theme-menu-button_type_${theme}`),
	)

	if (target) {
		target.classList.add('header__theme-menu-button_active')
		target.setAttribute('disabled', '')
	}
}
