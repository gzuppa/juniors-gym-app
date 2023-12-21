import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import { Grid } from '@mui/material'
import useMembers from '../hooks/useMembers'
import Loader from '../assets/files/Loader'

const Member = () => {
  const params = useParams()
  const { getMember, loading, member } = useMembers()

  useEffect(() => {
    getMember(params.id)
  }, [])

  const { name, lastName } = member

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-between">
      <h1 className="text-4xl text-yellow-300 font-raleway">
        {name} {lastName}
      </h1>
      <div className="flex items-center gap-2 text-yellow-100 hover:text-yellow-300">
        <Link
          to={`/members/edit/${params.id}`}
          className="p-2 font-raleway block text-center rounded-lg"
        >
          <AutoFixHighIcon className="mr-4 mb-1" fontSize="large" />
          Editar
        </Link>
      </div>
    </div>
  )
}

export default Member
