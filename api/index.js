import axios from 'axios'

const url = `https://reqres.in`
export const fetchUsers = (url) => axios.get(`${url}/api/users/2`)
