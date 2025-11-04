import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

export default function UserProvider({ children }) {
  const userFromStorage = sessionStorage.getItem('user')

  const [user, setUser] = useState(
    userFromStorage ? JSON.parse(userFromStorage) : { email: '', password: '' }
  )

  const signUp = async () => {
    const headers = { headers: { 'Content-Type': 'application/json' } }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      JSON.stringify({ user: user }),   
      headers
    )

    setUser({ email: '', password: '' })
  } 


  const signIn = async () => {
    const headers = { headers: { 'Content-Type': 'application/json' } }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      JSON.stringify({ user: user }),   
      headers
    )

    setUser(response.data)
    sessionStorage.setItem('user', JSON.stringify(response.data))
  }

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
      {children}
    </UserContext.Provider>
  )
}
