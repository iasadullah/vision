'use client'

import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import ApplicationList from '@/views/ApplicationList'

import { getUserApplications } from '@/Services/UserApplicationService'

import ApiNames from '@/constants/ApiNames'

export default function Page() {
  const router = useRouter()

  const [userListData, setUserListData] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
    } else {
      getApplication()
    }
  }, [router])

  const getApplication = async () => {
    try {
      const response = await getUserApplications(ApiNames.UserApplications)

      if (response.result.length > 0) {
        setUserListData(response.result[0])
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return <ApplicationList userListData={userListData} />

  // commit
}
