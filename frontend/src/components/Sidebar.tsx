import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const { auth } = useAuth()

  return (
    <aside className="md:w-80 lg:w-84 px-6">
      <p className="text-xl font-nunito text-yellow-300 mt-5">Hola {auth.name}</p>
      <Link to='create-member' className="bg-yellow-300 w-full p-3 text-purple-800 uppercase font-nunito font-bold block mt-5 text-center rounded-lg">Crear nuevo usuario</Link>
    </aside>
  )
}

export default Sidebar
