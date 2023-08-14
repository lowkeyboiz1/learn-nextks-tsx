import { axios } from '@/service/axios'
import { useCookies } from 'react-cookie'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserInfo } from '@/redux/actions/UserInfo'
import { useRouter } from 'next/router'

function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['token'])
  const dispatch = useDispatch()
  const UserInfoState = useSelector((state: any) => state.UserInfoReducer)

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!name.length || !password.length) return
    try {
      const result = await axios.post('/api/login', {
        email: name,
        password,
      })

      setCookie('token', result.token)
      dispatch(
        UserInfo({
          loading: false,
          isAuth: true,
          userInfo: {
            name,
            password,
          },
        }),
      )
      router.push('/Users')
    } catch (error) {
      console.error('Error:', error)
    }
  }
  console.log(UserInfoState)

  return (
    <div className='h-[100vh] bg-white'>
      <div className='max-w-[500px] rounded-md p-4 bg-white flex flex-col gap-4 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='text-black text-center text-[20px] mb-4'>Sign in</div>
        <TextField
          id='outlined-basic'
          label='User name'
          variant='outlined'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='text-white bg-[#0984e3] rounded-[4px] p-2 mt-4'
          onClick={handleSubmit}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Login
