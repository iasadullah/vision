import { createContext, useContext } from 'react'

interface UserContextType {
  UserData: any
  handleUserData: (val: any) => void
}

export const UserContext = createContext<UserContextType>({
  UserData: {},
  handleUserData: () => {}
})

export const useUserContext = () => useContext(UserContext)
