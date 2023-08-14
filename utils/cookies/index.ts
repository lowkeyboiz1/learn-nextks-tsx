// utils/cookies/index.ts
import { Cookies } from 'react-cookie'

export const getCookie = (nameToken: string) => {
  const cookies = new Cookies()
  return cookies.get(nameToken)
}
