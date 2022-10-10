export const BASE_URL = 'https://api.sofalis.mesto.student.nomoredomains.icu';

function testStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res}`);
}

export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    credentials:'include',
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
    mode: 'cors',
    credentials:'include',
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
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      mode: 'cors',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(testStatus)
};
