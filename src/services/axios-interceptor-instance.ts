'use client'
import axios from 'axios'

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTA3YTgzNS1kYzNmLTQ5OGItYWJlZS1kOTM1NDJmYTg1YjYiLCJpYXQiOjE3MDM2MzIyNjZ9.igk_An_aVDEMav-Tg_aHorFLqJsBD44AzGmJVG4xuKSkYP_tEZ6K62ZmGJWQwRU8qiUKTU5hdk2yUtVBqopwDMZf1Rhtv_Yj4updOg6Y66HhRCzWaFQzVaYnXzetxINcaT-GPfI4IT75Aaal_NtN03yOuT813SgurTRVzxb2mxnExVAzFLfVFKG4t5XN9sttwAJ5wU1cJUuSAv-ii_3ldgF9_lAb30a1sepsmCyVE7D0_WGbPD8uVlaa8Ol6rvKBsMYg1LZDRh8EsuUQEelaloM63-WKma2bF_WbWqKOkQiiKAhVO-ZBlq-fbSTCkdpGigfUVjh3CKSYih7Vq1pH-A'

export const AxiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
