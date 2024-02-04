'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDY1NTI5NjZ9.hWalUa4vVJXXreAsYUyKXf9m0vSrrxNcu1VUY13QmbjQws6up--QxxIVph_0gSjO0m9yMuuqnl08MKoZRLzG7YDVOgQjAcUQ1MlOC5kneAu-erTy5mTAtG16au8Qes-4dmJDn4KblI8Rmh31gx0DjcuQPV6rNCkjy-Eso7VlHY7zAtwyg-lTMLUgaLalIPoxdP4Rkw37hAR2SRbDVS6fwPDD_ZYD6cFM8tzg8XX3YK-MoVkd3cvXHn58Q8LlV1dQSHD52G2ZiPhAXTGHYOUW4sHlvd6jZE35wsV6vOmqAAUNFvMTMp7U38tj5FByh1uYsMLjMn4RuMS5OYt3iX31OA'
export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
