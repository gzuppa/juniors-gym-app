import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoutes from './layouts/ProtectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import Members from './pages/Members'
import NewMember from './pages/NewMember'
import { AuthProvider } from './context/AuthProvider'
import { MembersProvider } from './context/MembersProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MembersProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:token" element={<ConfirmAccount />} />
            </Route>
            <Route path="/members" element={<ProtectedRoutes />}>
              <Route index element={<Members />} />
              <Route path="create-member" element={<NewMember />} />
            </Route>
          </Routes>
        </MembersProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
