import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loader from '../assets/files/Loader'

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth()
  console.log(auth)
console.log(loading)
  if(loading) return <Loader />
  return (
    <>
      
      {auth._id ? <Outlet /> : <Navigate to='/' />}
    </>
  )
}

export default ProtectedRoutes
