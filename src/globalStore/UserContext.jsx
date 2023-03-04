import React, {createContext, useReducer} from 'react'
import { initialStore as initialState, StoreReducer as reducer } from "./UserReducer";

const UserContext = createContext()

const UserProvider = ({ children }) => { 

    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <UserContext.Provider 
            value={[state, dispatch]}
        >
            {children}
        </UserContext.Provider>
        
    )
}

export { UserProvider }
export default UserContext