import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosClient from '../config/axiosClient'

const MemberContext = createContext()

const MemberProvider = ({ children }) => {
  const [members, setMembers] = useState([])
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

  return (
    <MemberContext.Provider value={{ members, submitMember }}>
      {children}
    </MemberContext.Provider>
  )
}

export { MemberProvider }
export default MemberContext
