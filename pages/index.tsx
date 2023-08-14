import Layout from '@/components/Layout'
import { useSelector } from 'react-redux'
import Login from './Login'

export default function Home() {
  const UserInfoState = useSelector((state: any) => state.UserInfoReducer)

  // return UserInfoState.isAuth ? <Layout>khang</Layout> : <Login />

  return <Layout>khang</Layout>
}
