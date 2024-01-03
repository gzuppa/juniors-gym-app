import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useMembers from "../hooks/useMembers"

const Member = () => {
  const params = useParams()
  const { getMember } = useMembers()

  useEffect(() => {
    getMember(params.id)
  },[])

  return <div>Member</div>
}

export default Member
