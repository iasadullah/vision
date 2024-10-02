'use client'

import React, { useState, useEffect } from 'react'

import Profile from '@/views/Profile'
import ApiNames from '@/constants/ApiNames'
import { UserUpdateService } from '@/Services/AllRequestService'

export default function Page() {
  // const { UserData, handleUserData } = useContext(UserContext)

  const [profileData, setProfileData] = useState<any>(null)
  const [originalProfile, setOriginalProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saveLoading, setSaveLoading] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const profileString = localStorage.getItem('profile')

    if (profileString) {
      const profile = JSON.parse(profileString)

      setProfileData(profile)

      setOriginalProfile(profile)
    }

    setIsLoading(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfileData({ ...profileData, [name]: name === 'name' ? value : value.trim() })
  }

  const handleCancelClick = () => {
    setProfileData(originalProfile)

    setErrorMsg('')
  }

  const handleSaveClick = async () => {
    try {
      const requiredFields = ['contact', 'name', 'city', 'employmentReqion', 'dob', 'attendingYear']
      const hasEmptyField = requiredFields.some(field => profileData[field] === '')

      if (hasEmptyField) {
        setErrorMsg('Please fill in all required fields.')

        return
      }

      const hasChanges = Object.keys(profileData).some(key => profileData[key] !== originalProfile[key])

      if (!hasChanges) {
        setErrorMsg('No changes detected. Please modify at least one field.')

        return
      }

      setSaveLoading(true)
      setErrorMsg('')

      const _data = {
        contact: profileData.contact,
        name: profileData.name,
        city: profileData.city,
        employmentReqion: profileData.employmentReqion,
        dob: profileData.dob,
        attendingYear: profileData.attendingYear
      }

      const response = await UserUpdateService(ApiNames.userUpdate, _data)

      if (response.result === 'success') {
        localStorage.setItem('profile', JSON.stringify(profileData))

        setOriginalProfile(profileData)
      } else {
        setErrorMsg(response.result)
      }
    } catch (error) {
      console.error('Something went wrong')

      setErrorMsg('Something went wrong')
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <Profile
      originalProfile={originalProfile}
      agentProfile={profileData}
      handleInputChange={handleInputChange}
      handleCancelClick={handleCancelClick}
      handleSaveClick={handleSaveClick}
      errorMsg={errorMsg}
      isLoading={isLoading}
      saveLoading={saveLoading}
    />
  )
}
