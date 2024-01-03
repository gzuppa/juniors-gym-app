import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMembers from '../hooks/useMembers'
import Loader from '../assets/files/Loader'
import MemberForm from '../components/MemberForm'

const EditMember = () => {
  const params = useParams()
  const { getMember, loading, member } = useMembers()
  const { name, lastName } = member

  useEffect(() => {
    getMember(params.id)
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <h1 className="font-bold text-yellow-300 text-4xl">
        Editar usuario: {name} {lastName}
      </h1>
      <div className="mt-10 flex justify-center">
        <MemberForm />
      </div>
    </>
  )
}

export default EditMember
