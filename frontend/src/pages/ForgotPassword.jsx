import { useState } from 'react'
import axiosClient from '../config/axiosClient'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})
  const handleSubmit = async e => {
    e.preventDefault()
    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'El email es obligatorio',
        error: true,
      })
      return
    }
    try {
      const { data } = await axiosClient.post(
        `/users/forgot-password`,
        { email },
      )
      console.log(data, 'data')
      setAlert({
        msg: data.msg,
        error: false,
      })
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
          Recupera tu
          <span className="text-yellow-300"> cuenta</span>
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
        <input
          type="submit"
          value="Enviar instrucciones"
          className="mb-5 bg-purple-800 text-yellow-300 w-full py-3 uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-yellow-300 hover:text-purple-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-3 uppercase text-sm font-raleway text-yellow-300"
        >
          {' '}
          ¿Ya tienes cuenta? Iniciar sesión
        </Link>
        <Link
          to="/register"
          className="block text-center my-3 uppercase text-sm font-raleway text-yellow-300"
        >
          {' '}
          Registrar cuenta
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword
