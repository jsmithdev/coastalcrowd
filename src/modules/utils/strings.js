/**
 *
 * @param {String} string to capitalize (example-view => Example-view)
 * @returns {String}
 */
export function capitalize(s) {
	return s.slice(0, 1).toUpperCase() + s.slice(1, s.length);
}

/**
 *
 * @param {String} string to camel case (example-view => exampleView)
 * @returns {String}
 */
export function camelCase(string) {
	return string.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase());
}
