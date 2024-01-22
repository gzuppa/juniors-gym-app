import useMembers from '../hooks/useMembers'
import MemberPreview from '../components/Previews/MemberPreview'
import Searching from '../components/Searching'

const Members = () => {
  const { handleSearching, allMembers } = useMembers()

  return (
    <>
      <h1 className="text-4xl text-yellow-300 font-raleway font-bold">
        Usuarios
      </h1>
      <button
        className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer py-2 px-3 rounded-lg transition-colors mt-5 font-raleway"
        type="button"
        onClick={handleSearching}
      >
        Buscar usuario
      </button>
      <Searching />
      <div className="bg-white shadow mt-10 rounded-lg">
        {allMembers.length ? (
          allMembers.map(member => (
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
