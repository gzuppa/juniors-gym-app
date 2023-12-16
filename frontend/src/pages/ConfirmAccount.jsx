import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'
import JuniorsLogo from '../assets/images/juniors-gym-logo.png'

const ConfirmAccount = () => {
  const params = useParams()
  const { id } = params
  const [alert, setAlert] = useState({})
  const [confirmedAccount, setConfirmedAccount] = useState(false)

  useEffect(() => {
    const confAccount = async () => {
      try {
        const url = `/users/confirm/${id}`
        const { data } = await axiosClient.get(url)
        setAlert({
          msg: data.msg,
          error: false,
        })
        setConfirmedAccount(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    confAccount()
  }, [])

  const { msg } = alert

  return (
    <>
      <div className="flex justify-center items-center">
        <img src={JuniorsLogo} alt="JuniorsLogo" className="h-32 mr-2" />
        <h1 className="text-purple-800 font-black text-4xl font-raleway">
          Confirma tu
          <span className="text-yellow-300"> cuenta</span>
        </h1>
      </div>
      <div>
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            to="/"
            className="block text-center my-3 uppercase text-sm font-raleway text-yellow-300"
          >
            {' '}
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount
