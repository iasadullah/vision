'use client'
import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../../context/UserContext'
import Profile from '@/views/Profile'

export default function Page() {
  const { UserData, handleUserData } = useContext(UserContext)
  const [profilData, setProfilData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [originalProfile, setOriginalProfile] = useState<any>(null)

  useEffect(() => {
    if (UserData === null) {
      const profileString = localStorage.getItem('profile')

      if (profileString) {
        const profile = JSON.parse(profileString)

        setProfilData(profile)
        handleUserData(profile)
      }
    } else {
      setProfilData(UserData)
    }
  }, [localStorage.getItem('profile')])

  const handleEditClick = () => {
    setIsEditing(!isEditing)
    setOriginalProfile(profilData)
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target

    setProfilData({ ...profilData, [name]: value })
  }

  const handleCancelClick = () => {
    setProfilData(originalProfile)
    setIsEditing(false)
  }

  const handleSaveClick = () => {
    setIsEditing(false)

    // You may want to call a save function here to persist changes.
  }

  return (
    <Profile
      agentProfile={profilData}
      handleEditClick={handleEditClick}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      handleCancelClick={handleCancelClick}
      handleSaveClick={handleSaveClick}
    />
  )
}
