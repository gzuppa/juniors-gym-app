import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import useMembers from '../hooks/useMembers'
import Loader from '../assets/files/Loader'

const Member = () => {
  const params = useParams()
  const { getMember, loading, member } = useMembers()
  const { name, lastName } = member

  useEffect(() => {
    getMember(params.id)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-between">
      <h1 className="font-bold text-yellow-300 text-4xl">
        {name} {lastName}
      </h1>
      <Link
        className="text-yellow-300 hover:text-purple-600 cursor-pointer flex items-center gap-2"
        to={`/admin/members/edit/${params.id}`}
      >
        <EditOutlinedIcon /> Editar
      </Link>
    </div>
  )
}

export default Member
