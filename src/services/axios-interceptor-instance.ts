'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDUwODQ5NDh9.Elr8tbrVm2tt2hlg3HOzPLfcQ68Gopy58nvJvi4XDglkFt75jZKo3TX0LT3q-2hwG6Z5KFscRQ7l3sHeXGR9slrKaPSO80G-U4TIqx506GOdVtbQzASo5KvRcgOj_CakbwWdS0GYGUCqM0jjRDM0-iau2S-8fpbSGnRplRSpBfP5Bd_C3zQjqGvM1ZQ-kmQryUgsC_cBf7eSBCux_eN7RrIBGpuGs8m79j80OMDmy12DNjlUW7LUCrXCJCdzLNjjZXfX3Qsam6Y3opHwEtRXbR0tuSto6XWbkp6tOtgQ9d1DbxBcVML136Qs4Z8L_07Hzd9v5y2ClB-Cfd9k-QcKRQ'

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
