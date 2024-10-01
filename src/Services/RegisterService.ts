import { fetchPost } from './NetWorkServices'

export const SignUpService = async (
  endpoint: string,
  requestData: {
    email: string
    password: string
    contact: number
    name: string
    employmentReqion: string
    city: string
    attendingYear: string
    dob: string
  }
) => {
  try {
    const response = await fetchPost(endpoint, requestData)

    return response
  } catch (error) {
    // Type-check the error before parsing
    if (error instanceof Error && error.message) {
      const errorData = JSON.parse(error.message)

      throw new Error(errorData.result || 'An error occurred')
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
