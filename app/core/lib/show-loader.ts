/**
 * Displays the loader while restoring the state from the hash.
 */

export const SHOW_LOADER_SCRIPT = `
;(() => {
	if (window.location.hash && window.location.hash.length > 1) {
		document.documentElement.classList.add('_loading')
	}
})()
`

export const SHOW_LOADER_STYLE = `
html._loading main {
	display: none;
}
`
