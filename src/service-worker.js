import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.js';
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', () => {
	console.log('Service worker activated');
	// eslint-disable-next-line no-restricted-globals
	self.clients.claim()
});