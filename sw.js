const CACHE_NAME = 'dopamine-type-v2';
const ASSETS = [
  '/dopamine-type/',
  '/dopamine-type/index.html',
  '/dopamine-type/css/style.css',
  '/dopamine-type/js/app.js',
  '/dopamine-type/js/i18n.js',
  '/dopamine-type/js/locales/de.json',
  '/dopamine-type/js/locales/en.json',
  '/dopamine-type/js/locales/es.json',
  '/dopamine-type/js/locales/fr.json',
  '/dopamine-type/js/locales/hi.json',
  '/dopamine-type/js/locales/id.json',
  '/dopamine-type/js/locales/ja.json',
  '/dopamine-type/js/locales/ko.json',
  '/dopamine-type/js/locales/pt.json',
  '/dopamine-type/js/locales/ru.json',
  '/dopamine-type/js/locales/tr.json',
  '/dopamine-type/js/locales/zh.json',
  '/dopamine-type/manifest.json',
  '/dopamine-type/icon-192.svg',
  '/dopamine-type/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
