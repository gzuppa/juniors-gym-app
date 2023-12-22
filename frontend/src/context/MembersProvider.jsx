import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const MembersContext = createContext()

const MembersProvider = ({ children }) => {
  const [members, setMembers] = useState([])
  const [alert, setAlert] = useState({})
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

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 5000)
  }

  const submitMember = async member => {
    if(member.id) {
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
      const { data } = await axiosClient.put(`/members/${member.id}`, member, config)
      const updatedMembers = members.map(memberState => memberState._id === data._id ? data : memberState)
      setMembers(updatedMembers)

      setAlert({
        msg: 'Usuario actualizado correctamente',
        error: false,
      })
      setTimeout(() => {
        setAlert({})
        navigate('/members')
      }, 3000)

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
      setAlert({
        msg: 'Usuario creado correctamente',
        error: false,
      })
      setTimeout(() => {
        setAlert({})
        navigate('/members')
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
    }
    setLoading(false)
  }

  return (
    <MembersContext.Provider
      value={{
        alert,
        getMember,
        loading,
        member,
        members,
        showAlert,
        submitMember,
      }}
    >
      {children}
    </MembersContext.Provider>
  )
}

export { MembersProvider }
export default MembersContext
