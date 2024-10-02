'use client'

import React, { useState, useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import ApplicationList from '@/views/ApplicationList'

import { getUserApplications } from '@/Services/UserApplicationService'

import ApiNames from '@/constants/ApiNames'

export default function Page() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [userListData, setUserListData] = useState<any>(null)

  const [isLoading, setIsLoading] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
    } else {
      getApplication()
    }
  }, [router])

  const goBackClick = () => {
    setIsLoading(false)
    setErrorMsg('')
    router.back()
  }

  const getApplication = async () => {
    try {
      setIsLoading(true)
      setErrorMsg('')
      const response = await getUserApplications(ApiNames.getApplicationDetails + searchParams.get('applicationId'))

      if (typeof response.result === 'object') {
        setUserListData(response.result)
      } else if (response.result === 'application not found') {
        setErrorMsg('Application not found.. !')
      }

      setIsLoading(false)
    } catch (error) {
      setErrorMsg('Something went wrong.. !')
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <ApplicationList userListData={userListData} isLoading={isLoading} errorMsg={errorMsg} goBackClick={goBackClick} />
  )

  // commit
}
