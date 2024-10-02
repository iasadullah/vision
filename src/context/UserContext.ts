import { createContext, useContext } from 'react'

export interface UserData {
  role?: 'admin' | 'alumni'

  // Add other user properties here
}

export interface UserContextType {
  userData: UserData
  handleUserData: (val: UserData) => void
}

export const UserContext = createContext<UserContextType>({
  userData: {}, // or { role: undefined }
  handleUserData: () => {}
})

export const useUserContext = () => useContext(UserContext)
