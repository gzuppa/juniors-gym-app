import MembersForm from '../components/MembersForm'

const NewMember = () => {
  return (
    <>
      <h1 className="text-3xl font-raleway text-yellow-300">
        Registrar nuevo usuario
      </h1>
      <div className="mt-10 flex justify-center">
        <MembersForm />
      </div>
    </>
  )
}

export default NewMember
