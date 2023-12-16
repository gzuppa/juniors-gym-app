import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const NewPassword = () => {
  const params = useParams()
  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    const { token } = params
    const checkToken = async () => {
      try {
        await axios(`http://localhost:4000/api/users/forgot-password/${token}`)
        setValidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    checkToken()
  }, [])

  const { msg } = alert

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-2" />
        <h1 className="text-purple-800 font-black text-4xl font-raleway">
          Reestablece tu
          <span className="text-yellow-300"> password</span>
        </h1>
      </div>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-purple-800 block text-xl font-nunito"
            >
              Nuevo password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 font-nunito"
            />
          </div>
          <input
            type="submit"
            value="Guardar nuevo password"
            className="mb-5 bg-purple-800 text-yellow-300 w-full py-3 uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-yellow-300 hover:text-purple-800 transition-colors"
          />
        </form>
      )}
    </>
  )
}

export default NewPassword
