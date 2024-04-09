'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MTIyNDk3ODV9.CW_qjJ-v548WXQlhfcatFvsckojvraMjEyZV4bz3VC8_0l4siHCD1-tKq1wAReAo2lpl3EarbTZXVGZ0HUkEmI4jFr4jdtS9Wbrg_v8uqn_jimcTRTzuaau4iq7LOcfRYZslcH8DuHmY7WO9iN5EJKuCyA8JFykJTRHJYpbV7Oq-3ggXruinL--bYXJ6M-l_Md43QY7On2MFw5k3SLMGpVA2k5oNtHJ5ovDPJZnq5uVfb8HNcXHuAyCXxRcgHTtg36Ajd460NOKxKGixCwr0OhRwbghhCfsYFFNPpU54pkQLJYKcFneB3n-uaEzWINMiuWVWkJ6SGWtY5ERQJ3Jjag'

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
