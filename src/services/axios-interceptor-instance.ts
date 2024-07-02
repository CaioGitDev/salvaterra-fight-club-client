'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MTk5NTg3NDd9.fFFWtM6Z_gjguJ0mpm2sq785T5zhRNKh1RolxY-YBYImvPFyxyIDYYcCbbI-03IKfvSbFDTXodAQVNeAoDydPLnKfZqUkW7VxLbpku_EHkV3P31Akw7YUz9AVuuSfogd8LZwah96liMbXTldkaPoX65tzqzqARAZV6UAUmN3020O8SgKnfvN5xC5hq0xqsr1rXLFzOI8r5e4UHRjm1-0EWBhCQ_Izk4TrMcyWGnQRQ1qTspEZy8Hs5AKyJlNJe5QPtDs2SYl2iV-u7hYbjQHbb-Dw-NKOL9WUK4jCcx6afupHzOhjvhgE6PH1pSiBMe81Y4JHyn-SMdNEndxM1XKgQ'
export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
