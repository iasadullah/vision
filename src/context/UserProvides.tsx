'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'

import type { UserData } from './UserContext'
import { UserContext } from './UserContext'

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({})

  useEffect(() => {
    // Initialize from localStorage if available
    const storedData = localStorage.getItem('userData')

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)

        setUserData(parsedData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
      }
    }
  }, [])

  const handleUserData = useCallback((val: UserData) => {
    console.log('valLLL', val)
    setUserData(val)

    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(val))
  }, [])

  const contextValue = useMemo(
    () => ({
      userData,
      handleUserData
    }),
    [userData, handleUserData]
  )

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
