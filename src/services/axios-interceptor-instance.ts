'use client'
import axios from 'axios'

// call and get the access token from httponly cookie
let accessToken =
  document?.cookie?.split('; ').find((row) => row.startsWith('accessToken')) ??
  ''.split('=')[1]

if (!accessToken) {
  fetch('http://localhost:3333/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: 'dev.caiorosa@gmail.com',
      password: '123456',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.cookie = `accessToken=${data.accessToken}; path=/`
      accessToken = data.accessToken
    })
}

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
