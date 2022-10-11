export const BASE_URL = 'https://api.sofalis.mesto.student.nomoredomains.icu';

function testStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res}`);
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then(testStatus)
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials:'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then(testStatus)
};

export function getContent() {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(testStatus)
};

export function logoff() {
  return fetch(`${BASE_URL}/logoff`, {
      method: "POST",
      credentials:'include',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(testStatus)
};