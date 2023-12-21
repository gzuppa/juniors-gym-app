import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useMembers from "../hooks/useMembers"
import Loader from "../assets/files/Loader"
import MembersForm from "../components/MembersForm"

const EditMember = () => {
  const params = useParams()
  const { getMember, loading, member } = useMembers()

  useEffect(() => {
    getMember(params.id)
  }, [])

  const { name, lastName } = member

  if(loading) return <Loader />

  return (
    <>
    <h1 className="text-4xl text-yellow-300 font-raleway">Editar Usuario: {name}{' '}{lastName}</h1>
    <div className="mt-10 flex justify-center">
      <MembersForm />
    </div>
    </>
  )
}

export default EditMember