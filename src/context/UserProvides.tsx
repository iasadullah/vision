'use client'

import React, { useState } from 'react'

import { UserContext } from './UserContext'

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [UserData, setUserData] = useState({})

  const handleUserData = (val: any) => {
    setUserData(val)
  }

  return <UserContext.Provider value={{ UserData, handleUserData }}>{children}</UserContext.Provider>
}
