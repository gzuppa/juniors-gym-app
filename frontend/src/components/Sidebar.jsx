import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Sidebar = () => {
  const { auth } = useAuth()

  return (
    <aside className="md:w-80 lg:w-84 px-6">
      <p className="text-xl font-nunito text-yellow-300 mt-5">
        Hola {auth.name}
      </p>
      <Link
        to="create-member"
        className="bg-yellow-300 text-purple-800 hover:bg-purple-800 hover:text-yellow-300 w-full p-3 font-raleway font-bold mt-5 text-center rounded-lg flex items-center justify-center transition-colors"
      >
        <AddCircleOutlineIcon className='mr-2'/> Crear nuevo usuario
      </Link>
    </aside>
  )
}

export default Sidebar
