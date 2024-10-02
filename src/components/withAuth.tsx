'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useUserContext } from '@/context/UserContext'

export function withAuth(WrappedComponent: React.ComponentType, allowedRoles: string[] | 'all') {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()
    const { userData, handleUserData } = useUserContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      async function checkAuth() {
        if (!userData || !userData.role) {
          const storedUserData = localStorage.getItem('userData')

          if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData)

            handleUserData(parsedUserData)
          } else {
            router.push('/login')

            return
          }
        } else {
          if (allowedRoles !== 'all' && !allowedRoles.includes(userData.role) && userData.role !== 'admin') {
            router.push('/unauthorized')

            return
          }

          setIsLoading(false)
        }
      }

      checkAuth()
    }, [handleUserData, router, userData]) // Include missing dependencies

    useEffect(() => {
      if (userData && userData.role) {
        if (allowedRoles !== 'all' && !allowedRoles.includes(userData.role) && userData.role !== 'admin') {
          router.push('/unauthorized')
        } else {
          setIsLoading(false)
        }
      }
    }, [userData, router])

    if (isLoading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }
}
