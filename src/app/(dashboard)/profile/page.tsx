'use client'
import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../../context/UserContext'
import Profile from '@/views/Profile'

export default function Page() {
  const { userData, handleUserData } = useContext(UserContext)
  const [profilData, setProfilData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [originalProfile, setOriginalProfile] = useState<any>(null)

  useEffect(() => {
    const profileString = localStorage.getItem('profile')

    if (profileString) {
      const profile = JSON.parse(profileString)

      if (!userData) {
        setProfilData(profile)
        handleUserData(profile)
      }
    } else if (userData) {
      setProfilData(userData)
    }
  }, [userData, handleUserData])

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
