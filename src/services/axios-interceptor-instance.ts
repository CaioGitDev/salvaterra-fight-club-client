'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MjAwMTM3Nzh9.NFOnjHtHcg1k4E1uZBQhp6UrHbErHsYxUfBvwd4YBkXJH1DflQwDRlR_I7VRXnZK2Ax4EG4hI1uDODOw4vQGzgGz22pISvgUwEMfFz1WSVMWednWRdDh3bgSZeS4LKuptKJUjEQm9aHFCZFhkyc3hFktDt0UZjZvultKF8_YHR7QiCSAa6r6Iyy5mx8FFh0HgErIzz-MGu7ZsLEUTskpZCFzCdS4DX7ARR-FJfC0J6b4DTTLKVsxTUwxc3q12X2rBa33QuG8T5qhcYU8GMXQm5tq7RBFASo3SaC8ex5M1ZI0oBW8uoZd4gnelG3rxdYKfwJk9D9XPIf9eAdC8WcNaQ'

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
