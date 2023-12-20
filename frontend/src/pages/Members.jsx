import useMembers from '../hooks/useMembers'
import MemberPreview from '../components/MemberPreview'

const Members = () => {
  const { members } = useMembers()
  console.log(members)
  return (
    <>
      <h1 className="text-3xl font-raleway text-yellow-300">Usuarios</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {members.length ? (
          members.map(member => (
            <MemberPreview key={members._id} member={member} />
          ))
        ) : (
          <p className="mt-1 text-center text-purple-800 uppercase">
            No has registrado ningún usuario
          </p>
        )}
      </div>
    </>
  )
}

export default Members
