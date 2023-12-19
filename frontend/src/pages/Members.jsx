import useMembers from "../hooks/useMembers"

const Members = () => {
  const {members} = useMembers() 
  console.log(members)
  return (
    <>
      <h1 className='text-3xl font-raleway text-yellow-300'>Usuarios</h1>
    </>
  )
}

export default Members
