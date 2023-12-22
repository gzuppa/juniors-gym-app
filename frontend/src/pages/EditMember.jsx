import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMembers from '../hooks/useMembers'
import Loader from '../assets/files/Loader'
import MembersForm from '../components/MembersForm'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const EditMember = () => {
  const params = useParams()
  const { getMember, deleteMember, loading, member } = useMembers()

  useEffect(() => {
    getMember(params.id)
  }, [])

  const handleClick = () => {
    if(confirm('Deseas eliminar este usuario?')) {
      deleteMember(params.id)
    }
  }

  const { name, lastName } = member

  if (loading) return <Loader />

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl text-yellow-300 font-raleway">
          Editar Usuario: {name} {lastName}
        </h1>
        <div className="flex items-center gap-2 text-yellow-300 hover:text-red-600">
          <button className="p-2 font-raleway block text-center rounded-lg" onClick={handleClick}>
            <DeleteForeverIcon className="mr-4 mb-1" fontSize="large" />
            Eliminar usuario
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <MembersForm />
      </div>
    </>
  )
}

export default EditMember
