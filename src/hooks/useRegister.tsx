'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

const useRegister = () => {
  const router = useRouter()
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
    firstName: '',
    lastName: '',
    contact: '',
    city: '',
    degree: ''
  })

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmitPressed = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    // Validate fields before setting loading state
    if (Object.values(formData).some(field => !field)) {
      setError('Please fill in all fields')

      return
    }

    setIsLoading(true)

    try {
      // Implement your API call here
      // const response = await registerUser(formData)
      router.push('/login')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }

      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    isPasswordShown,
    error,
    isLoading,
    handleInputChange,
    handleClickShowPassword,
    onSubmitPressed
  }
}

// Keep it as a default export
export default useRegister
