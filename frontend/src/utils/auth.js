export const BASE_URL = 'https://auth.nomoreparties.co';

function testStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res}`);
}

export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    })
  })
    .then(testStatus)
}

export function authorize(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    })
  })
    .then(testStatus)
};

export function getContent() {
  const token = localStorage.getItem('jwt');
  if (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(testStatus)
  } else {
    return Promise.reject(`Ошибка: пользователь не авторизован `)
  }
}
