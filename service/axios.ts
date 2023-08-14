import { API_URL } from '@/configs'
import { getCookie } from '@/utils/cookies'
import Axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

async function authRequestInterceptor(config: any) {
  const token = await getCookie('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  // config.withCredentials = true
  return config
}

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    try {
      if (error.response.status === 401) {
        toast.error('Unauthorized')
      }
      return Promise.reject(error)
    } catch (error) {}
  },
)
