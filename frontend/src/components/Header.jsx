import { Link } from 'react-router-dom'
import LogoTransparent from '../assets/images/logo-transparent.png'
import SharedButton from './shared/SharedButton'

const Header = () => {
  return (
    <header className="px-4 py-5 border-b bg-purple-950">
      <div className="md:flex md:justify-between items-center">
        <img src={LogoTransparent} alt="JuniorsLogo" className="h-20 mr-2" />
        <h2 className="text-4xl text-yellow-300 text-center font-raleway">
          Junior's Gym Admin
        </h2>
        <input
          type="search"
          placeholder="Buscar usuario"
          className="rounded-lg lg:w-96 p-2 border"
        />
        <div className="flex items-center gap-6">
          <Link to="/members" className="font-bold uppercase text-yellow-300">
            {' '}
            Usuarios{' '}
          </Link>
          <SharedButton text={'Cerrar sesión'} />
        </div>
      </div>
    </header>
  )
}

export default Header
