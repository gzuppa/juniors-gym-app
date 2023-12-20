import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Loader from '../assets/files/Loader'

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth()
  console.log(auth)
  console.log(loading)
  if (loading) return <Loader />
  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default ProtectedRoutes
