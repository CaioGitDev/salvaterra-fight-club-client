'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MjAwMjg0NTF9.SLPYTISdMwVKb3-b883xk6lfSF8VGS8eKhJmFND6yCMd3BOoUPAX_z1vt0r4ihZ8eiB8d79cbsRRs49XicLs_VX9m6UE8vBMmZf93vsFWTRow4nkdfJbC8w9UyiMFrugT3CK8DE0CpdHPa-kITQIvzId2iabzvcejIgl_K3RDXD2xakXcvch7sHAbSeXyWFtHRD0cxxPvh29cXkAq6OfchCz-vMPL-I06lAHXpHDjueBb11i2k5PGEaBEfSWHCiZrx5Eg9A7KeiY6O65-UZ6swrM1eYH01ZuI6AAdkj1hggxkhIqdZeg-6CWqLKr3jAsgQHZxPBfYJgoEMhrE9T-4Q'

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
