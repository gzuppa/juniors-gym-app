import { createContext, useState, useEffect, Children } from "react";
import axiosClient from "../config/axiosClient";

const MembersContext = createContext()

const MembersProvider = ({children}) => {
  const [members, setMembers] = useState([])

  return(
      <MembersContext.Provider value={{members}}>
        {children}
      </MembersContext.Provider>
  )
}

export { MembersProvider }
export default MembersContext