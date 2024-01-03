import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../config/axiosClient'

const MemberContext = createContext()

const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState([])
  const [member, setMember] = useState({})
  const [loading, setLoading] = useState(false)
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

  return (
    <MemberContext.Provider
      value={{ getMember, loading, member, members, submitMember }}
    >
      {children}
    </MemberContext.Provider>
  )
}

export { MemberProvider }
export default MemberContext
