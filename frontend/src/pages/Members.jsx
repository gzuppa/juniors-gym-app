import useMembers from '../hooks/useMembers'
import MemberPreview from '../components/MemberPreview'

const Members = () => {
  const { members } = useMembers()

  return (
    <>
      <h1 className="text-4xl text-yellow-300 font-raleway font-bold">
        Usuarios
      </h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {members.length ? (
          members.map(member => (
            <MemberPreview key={member._id} member={member} />
          ))
        ) : (
          <p className="mt-5 text-center text-purple-800 uppercase">
            Aún no hay usuarios creados
          </p>
        )}
      </div>
    </>
  )
}

export default Members
