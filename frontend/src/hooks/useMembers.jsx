import { useContext } from 'react'
import MembersContext from '../context/MembersProvider'

const useMembers = () => {
  return useContext(MembersContext)
}

export default useMembers
