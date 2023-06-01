
export function copyTextToClipboard(text) {
	
	return new Promise((res, rej) => navigator.clipboard.writeText(text).then(
		() => res(true),
		() => {// error with navigator.clipboard.writeText, falling back...
			const success = fallbackCopyTextToClipboard(text);
			if(success) {
				return res(false);
			}
			return rej(false);
		})
	);
}

export function fallbackCopyTextToClipboard(text) {

	const textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand("copy");
		
		document.body.removeChild(textArea);
		if (successful) {
			return true
		} 
		return false
	} catch (error) {
		return false
	}
}