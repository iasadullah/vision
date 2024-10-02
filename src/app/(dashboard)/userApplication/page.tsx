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
      const response = await getUserApplications(ApiNames.getApplicationDetails + searchParams.get('applicationId'))

      if (response.result) {
        setUserListData(response.result)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return <ApplicationList userListData={userListData} />

  // commit
}
