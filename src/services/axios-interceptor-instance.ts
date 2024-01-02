'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDQyMTkwMDN9.EDlJzuoNdX9Wya0DfPuyDiEfPduRg9ABEzN6KXL4Anbzxs0dFa0MaIwYX4wGJ0w4KfJqM8XE4_R2vi7_zNg5PRVACySkSZHujcx6eGRU45uCfR0YgtLXth6sf4NUA9gibIKq9PwvN42YTpV9pgktTTHGAsCWegIH51hJ9qcXlMoQ-lVPWdPxbbIlebLVjI1Z0acKyyab7FVfw86uw452KkZnkXsAW-FiJAf2Z58V3JUF_9zD-AlnxcH2vItRAt6gfSGvCOm0RcTHaa8Y2FZEtSxZRKzVYNrJEFiw3XwCVsBCO5aurAK33wYWwwAYIECKxekyeGONi5RTyj1O8BoUhg'
export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
