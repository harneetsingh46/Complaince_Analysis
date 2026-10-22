import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext.jsx"
import apiClient from '../../ApiClient/interceptor.js'
import { useEffect } from 'react'
const SignOut = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await apiClient.post("/auth/sign-out")
      setUser(null)
      navigate("/")
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    logout()
  }, [])
  return (
    <div>SignOut....</div>
  )
}

export default SignOut