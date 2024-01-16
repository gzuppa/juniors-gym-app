import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link
        className="text-purple-800 hover:text-purple-600 uppercase cursor-pointer text-sm font-raleway font-bold"
        to="/admin-login"
      >
        Iniciar sesión como administrador
      </Link>
      <br />
      <br />
      <Link
        className="text-purple-800 hover:text-purple-600 uppercase cursor-pointer text-sm font-raleway font-bold"
        to="/user-assistance"
      >
        Registrar asistencia como usuario
      </Link>
    </div>
  )
}

export default Home
