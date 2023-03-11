
export function emoji(type) {
	if (type === 'home') return '🌊';
	if (type.includes('solution')) return '🌴';
	if (type.includes('component')) return '🧩';
	if (type === 'development') return '🧩';
	if (type === 'development') return '👨‍💻';
	if (type === 'shared') return '📌';
	if (type === 'design') return '🎨';
	if (type === 'marketing') return '📈';
	if (type === 'business') return '📊';
	if (type === 'deploy') return '🚀';
	if (type === 'other') return '🤷‍♂️';
	return '🤷‍♂️';
}