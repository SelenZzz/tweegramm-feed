const LOCAL_DOMAINS = ['localhost', '127.0.0.1'];
const CLIENT_API_URL_PUBLIC = 'http://94.19.178.248:40001';
const CLIENT_API_URL_LOCAL = 'http://192.168.1.15:40001';

export const url =
  LOCAL_DOMAINS.includes(window.location.hostname) ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.0.') ||
  window.location.hostname.endsWith('local')
    ? CLIENT_API_URL_LOCAL
    : CLIENT_API_URL_PUBLIC;
