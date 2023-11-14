import { createContext, useContext, useState, useEffect } from "react";
import { account, ID } from './lib/appwrite';
import { Loading } from '../Loading'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
    setLoading(true)
    try {
      await account.createEmailSession(email, password);
      let accountDetails = await account.get()
      setUser(accountDetails)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  }

const register = async (email, password, name) => {
    setLoading(true)
    try {
        await account.create(ID.unique(), email, password, name);
        login(email, password);

    } catch (error) {
        console.error(error)
    }
    setLoading(false)
  }

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get()
      setUser(accountDetails);
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
    
    const contextData = {user, login, logout, register}

    useEffect(() => {
        checkUserStatus()
    }, [])
    
    return (
        <AuthContext.Provider value = {contextData}>
            {loading ? <Loading/> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext