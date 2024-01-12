import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import io from 'socket.io-client'
import useMembers from '../hooks/useMembers'
import useAdmin from '../hooks/useAdmin'
import Loader from '../assets/files/Loader'
import Training from '../components/Training'
import TrainingFormModal from '../components/Modals/TrainingFormModal'
import DeleteTrainingModal from '../components/Modals/DeleteTrainingModal'
import DeleteSecondaryTrainerModal from '../components/Modals/DeleteSecondaryTrainerModal'
import SecondaryTrainer from '../components/SecondaryTrainer'

let socket

const Member = () => {
  const params = useParams()
  const {
    changeStatusTrainingMember,
    deleteTrainingMember,
    getMember,
    handleTrainingModal,
    loading,
    member,
    submitTrainingMember,
    updateTrainingMember,
  } = useMembers()
  const admin = useAdmin()
  const { name, lastName } = member

  useEffect(() => {
    getMember(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('Open member', params.id)
  }, [])

  useEffect(() => {
    socket.on('added training', newTraining => {
      if (newTraining.member === member._id) {
        submitTrainingMember(newTraining)
      }
    })
    socket.on('deleted training', deletedTraining => {
      if (deletedTraining.member === member._id) {
        deleteTrainingMember(deletedTraining)
      }
    })
    socket.on('updated training', updatedTraining => {
      if (updatedTraining.member._id === member._id) {
        updateTrainingMember(updatedTraining)
      }
    })
    socket.on('new status', newStatus => {
      if (newStatus.member._id === member._id) {
        changeStatusTrainingMember(newStatus)
      }
    })
  })

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
