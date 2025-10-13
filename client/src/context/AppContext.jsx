import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
* Context for managing user state and navigation.
* Provides information about the current user, their seller role, and navigation functionality.
*/
export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const value = {navigate, user, setUser,setIsSeller,
        isSeller, showUserLogin, setShowUserLogin}

return <AppContext.Provider value={value} >
{children}
</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}