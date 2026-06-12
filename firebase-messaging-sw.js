importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCwChifMIU5WH0HFNqXWkQs3Tcx4bxSGho',
  authDomain: 'kk-tiff.firebaseapp.com',
  projectId: 'kk-tiff',
  storageBucket: 'kk-tiff.firebasestorage.app',
  messagingSenderId: '176147798745',
  appId: '1:176147798745:web:c93ab8458377c63f43bcc8'
});

const messaging = firebase.messaging();

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

messaging.onBackgroundMessage(payload => {
  const data = payload.data || {};
  const title = data.title || '新聊天消息';
  const options = {
    body: data.body || '',
    tag: 'kk-tiff-chat',
    renotify: true,
    data: {
      url: data.url || './index.html#chat'
    }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || './index.html#chat', self.location.origin).href;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
