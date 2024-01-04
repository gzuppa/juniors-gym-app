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
      console.log(error)
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
  }

  const submitTraining = async training => {
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

  return (
    <MemberContext.Provider
      value={{
        deleteMember,
        getMember,
        handleTrainingModal,
        loading,
        member,
        members,
        submitMember,
        submitTraining,
        trainingModal,
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}

export { MemberProvider }
export default MemberContext
