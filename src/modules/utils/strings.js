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

/**
 * Function to generate and return a new UUID
 * @returns {String}
 * @example
 * const uuid = generateUUID();
 * console.log(uuid);
 * // => '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
 * */
export function generateUUID() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}