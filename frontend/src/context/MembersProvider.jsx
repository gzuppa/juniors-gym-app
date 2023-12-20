import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const MembersContext = createContext()

const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([])
  const [alert, setAlert] = useState([])
  const navigate = useNavigate()

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 5000)
  }

  const submitMember = async member => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axiosClient.post('/members', member, config)
      setAlert({
        msg: 'Usuario creado correctamente',
        error: false
      })
      setTimeout(() => {
        setAlert({})
        navigate('/members')
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MembersContext.Provider
      value={{ alert, members, showAlert, submitMember }}
    >
      {children}
    </MembersContext.Provider>
  )
}

export { MembersProvider }
export default MembersContext
