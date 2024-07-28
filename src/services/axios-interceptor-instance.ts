'use client'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const jwt = getCookie('jwt')

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
})
