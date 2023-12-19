import { createContext, useState, useEffect, Children } from "react";
import axiosClient from "../config/axiosClient";

const MembersContext = createContext()

const MembersProvider = ({children}) => {
    return(
        <MembersContext.Provider value={{}}>
          {children}
        </MembersContext.Provider>
    )
}

export { MembersProvider }
export default MembersContext