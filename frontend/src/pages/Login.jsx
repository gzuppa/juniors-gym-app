import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from '../components/shared/Alert'
import useAuth from '../hooks/useAuth'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const { auth, loading, setAuth } = useAuth()

  console.log(auth)
  console.log(loading)

  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-2" />
        <h1 className="text-purple-800 font-black text-4xl font-raleway">
          Inicia sesión para
          <span className="text-yellow-300"> administrar usuarios</span>
        </h1>
      </div>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-purple-800 block text-xl font-nunito"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 font-nunito"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-purple-800 block text-xl font-nunito"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 font-nunito"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar sesión"
          className="mb-5 bg-purple-800 text-yellow-300 w-full py-3 uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-yellow-300 hover:text-purple-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/register"
          className="block text-center my-3 uppercase text-sm font-raleway text-yellow-300"
        >
          {' '}
          Registrar cuenta
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-3 uppercase text-sm font-raleway text-yellow-300"
        >
          {' '}
          Recuperar password
        </Link>
      </nav>
    </>
  )
}

export default Login
