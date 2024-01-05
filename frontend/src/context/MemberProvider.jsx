import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../config/axiosClient'

const MemberContext = createContext()

const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState([])
  const [member, setMember] = useState({})
  const [loading, setLoading] = useState(false)
  const [trainingModal, setTrainingModal] = useState(false)
  const [deleteTrainingModal, setDeleteTrainingModal] = useState(false)
  const [deleteSecondaryTrainerModal, setDeleteSecondaryTrainerModal] =
    useState(false)
  const [training, setTraining] = useState({})
  const [trainer, setTrainer] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const getMembers = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await axiosClient('/members', config)
        setMembers(data)
      } catch (error) {
        console.log(error)
      }
    }
    getMembers()
  }, [])

  const submitMember = async member => {
    if (member.id) {
      await editMember(member)
    } else {
      await newMember(member)
    }
  }

  const editMember = async member => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.put(
        `/members/${member.id}`,
        member,
        config,
      )
      const updatedMembers = members.map(memberState =>
        memberState._id === data._id ? data : memberState,
      )

      setMembers(updatedMembers)
      Swal.fire({
        title: 'Éxito!',
        text: 'El usuario fue actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const newMember = async member => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.post('/members', member, config)
      setMembers([...members, data])

      Swal.fire({
        title: 'Éxito!',
        text: 'El usuario fue creado correctamente',
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
      setTimeout(() => {
        navigate('/admin/members')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const getMember = async id => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient(`/members/${id}`, config)
      setMember(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteMember = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.delete(`/members/${id}`, config)
      const updatedMembers = members.filter(
        memberState => memberState._id !== id,
      )

      setMembers(updatedMembers)

      Swal.fire({
        title: 'Éxito!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
      setTimeout(() => {
        navigate('/admin/members')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleTrainingModal = () => {
    setTrainingModal(!trainingModal)
    setTraining({})
  }

  const submitTraining = async training => {
    if (training?.id) {
      await editTraining(training)
    } else {
      await createTraining(training)
    }
  }

  const createTraining = async training => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.post('/trainings', training, config)
      const updatedMember = { ...member }
      updatedMember.trainings = [...member.trainings, data]
      setMember(updatedMember)
      setTrainingModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const editTraining = async training => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.put(
        `/trainings/${training.id}`,
        training,
        config,
      )
      const updatedMember = { ...member }
      updatedMember.trainings = updatedMember.trainings.map(trainingState =>
        trainingState._id === data._id ? data : trainingState,
      )
      setMember(updatedMember)
      setTrainingModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditTrainingModal = training => {
    setTraining(training)
    setTrainingModal(true)
  }

  const handleDeleteTrainingModal = training => {
    setTraining(training)
    setDeleteTrainingModal(!deleteTrainingModal)
  }

  const deleteTraining = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.delete(
        `/trainings/${training._id}`,
        config,
      )

      Swal.fire({
        title: 'Éxito!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })

      const updatedMember = { ...member }
      updatedMember.trainings = updatedMember.trainings.filter(
        trainingState => trainingState._id !== training._id,
      )

      setMember(updatedMember)
      setDeleteTrainingModal(false)
      setTraining({})
    } catch (error) {
      console.log(error)
    }
  }

  const submitTrainer = async name => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.post(
        '/members/trainers',
        { name },
        config,
      )
      setTrainer(data)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    } finally {
      setLoading(false)
    }
  }

  const addTrainer = async name => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.post(
        `/members/trainers/${member._id}`,
        name,
        config,
      )
      Swal.fire({
        title: 'Éxito!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })
      setTrainer({})
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.msg,
        icon: 'error',
        confirmButtonText: 'Cerrar',
      })
    }
  }

  const handleDeleteSecondaryTrainerModal = trainer => {
    setDeleteSecondaryTrainerModal(!deleteSecondaryTrainerModal)
    setTrainer(trainer)
  }

  const deleteSecondaryTrainer = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.post(
        `/members/delete-trainers/${member._id}`,
        { id: trainer._id },
        config,
      )
      const updatedMember = { ...member }
      updatedMember.secondaryTrainers = updatedMember.secondaryTrainers.filter(
        secondaryTrainerState => secondaryTrainerState._id !== trainer._id,
      )

      setMember(updatedMember)

      Swal.fire({
        title: 'Éxito!',
        text: data.msg,
        icon: 'success',
        confirmButtonText: 'Cerrar',
      })

      setTrainer({})
      setDeleteSecondaryTrainerModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MemberContext.Provider
      value={{
        addTrainer,
        deleteMember,
        deleteSecondaryTrainerModal,
        deleteTraining,
        deleteTrainingModal,
        deleteSecondaryTrainer,
        getMember,
        handleDeleteTrainingModal,
        handleDeleteSecondaryTrainerModal,
        handleEditTrainingModal,
        handleTrainingModal,
        loading,
        member,
        members,
        submitMember,
        submitTrainer,
        submitTraining,
        trainer,
        training,
        trainingModal,
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}

export { MemberProvider }
export default MemberContext
