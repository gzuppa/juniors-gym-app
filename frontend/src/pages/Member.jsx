import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import useMembers from '../hooks/useMembers'
import Loader from '../assets/files/Loader'
import TrainingFormModal from '../components/modals/TrainingFormModal'

const Member = () => {
  const params = useParams()
  const { getMember, handleTrainingModal, loading, member } = useMembers()
  const [ modal, setModal ] = useState(false)

  useEffect(() => {
    getMember(params.id)
  }, [])

  const { name, lastName } = member

  return loading ? (
    <Loader />
  ) : (
    <>
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
      <button
        onClick={handleTrainingModal}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg font-raleway bg-yellow-300 text-purple-800 mt-5 hover:bg-purple-800 hover:text-yellow-300 flex items-center transition-colors"
      >
        <AddCircleOutlineIcon className="mr-2" />
        Agregar plan de entrenamiento
      </button>

      <TrainingFormModal modal={modal} setModal={setModal}/>
    </>
  )
}

export default Member
