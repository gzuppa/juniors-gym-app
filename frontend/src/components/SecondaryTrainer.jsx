import useMembers from '../hooks/useMembers'

const SecondaryTrainer = ({ secondaryTrainer }) => {
  const { name, email } = secondaryTrainer
  const { handleDeleteSecondaryTrainerModal } = useMembers()

  return (
    <div className="border-b p-5 flex justify-between items-center font-raleway">
      <div>
        <p>{name}</p>
        <p className="text-sm mb-1 text-gray-600">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer px-4 py-3 font-bold font-raleway rounded transition-colors"
          onClick={() => handleDeleteSecondaryTrainerModal(secondaryTrainer)}
        >
          Eliminar entrenador
        </button>
      </div>
    </div>
  )
}

export default SecondaryTrainer
