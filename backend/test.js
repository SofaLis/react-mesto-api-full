/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ0MjA4OTllZTI5ZWQ0OTExMTQyZmUiLCJpYXQiOjE2NjU4MzkwMDksImV4cCI6MTY2NjQ0MzgwOX0.6-EjbwyI4ACX5yLHtbdrzcAhgJSPa8aFDCyAbo9zQ-E'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'super-strong-secret'; // вставьте сюда секретный ключ для разработки из кода
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(payload)
  // eslint-disable-next-line no-console
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    // eslint-disable-next-line no-console
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
};
