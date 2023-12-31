import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import useMembers from '../hooks/useMembers'
import useAdmin from '../hooks/useAdmin'
import Loader from '../assets/files/Loader'
import Training from '../components/Training'
import TrainingFormModal from '../components/TrainingFormModal'
import DeleteTrainingModal from '../components/DeleteTrainingModal'
import DeleteSecondaryTrainerModal from '../components/DeleteSecondaryTrainerModal'
import SecondaryTrainer from '../components/SecondaryTrainer'

const Member = () => {
  const params = useParams()
  const { getMember, handleTrainingModal, loading, member } = useMembers()
  const admin = useAdmin()
  const { name, lastName } = member

  useEffect(() => {
    getMember(params.id)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-yellow-300 text-4xl font-raleway">
          {name} {lastName}
        </h1>
        {admin && (
          <Link
            className="text-yellow-300 hover:text-purple-600 cursor-pointer flex items-center gap-2 font-raleway"
            to={`/admin/members/edit/${params.id}`}
          >
            <EditOutlinedIcon /> Editar
          </Link>
        )}
      </div>
      {admin && (
        <button
          type="button"
          onClick={handleTrainingModal}
          className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg font-bold font-raleway bg-yellow-300 hover:bg-purple-800 text-purple-800 hover:text-yellow-300 cursor-pointer flex items-center justify-center"
        >
          <LibraryAddOutlinedIcon className="mr-2" /> Agregar entrenamiento
        </button>
      )}
      <p className="font-bold text-xl mt-10 text-yellow-300">
        Entrenamientos del usuario
      </p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {member.trainings?.length ? (
          member.trainings?.map(training => (
            <Training key={training._id} training={training} />
          ))
        ) : (
          <p className="text-center my-5 p-10 font-raleway text-purple-800 font-bold">
            Este usuario no tiene entrenamientos registrados
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl text-yellow-300">
              Entrenadores del usuario
            </p>
            <Link
              className="text-yellow-300 hover:text-purple-600 cursor-pointer flex items-center gap-2 font-raleway"
              to={`/admin/members/new-trainer/${member._id}`}
            >
              <PostAddOutlinedIcon /> Agregar
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {member.secondaryTrainers?.length ? (
              member.secondaryTrainers?.map(secondaryTrainer => (
                <SecondaryTrainer
                  key={secondaryTrainer._id}
                  secondaryTrainer={secondaryTrainer}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10 font-raleway text-purple-800 font-bold">
                Este usuario no tiene entrenadores registrados
              </p>
            )}
          </div>
        </>
      )}
      <TrainingFormModal />
      <DeleteTrainingModal />
      <DeleteSecondaryTrainerModal />
    </>
  )
}

export default Member
