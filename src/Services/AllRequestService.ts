import { fetchGet, fetchPut } from './NetWorkServices'

export const AllAlumniRequest = async (endpoint: string) => {
  try {
    const response = await fetchGet(endpoint)

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

export const UserUpdateService = async (
  endpoint: string,
  requestData: {
    contact: string
    name: string
    city: string
    employmentReqion: string
    dob: string
    attendingYear: string
  }
) => {
  const response = await fetchPut(endpoint, requestData)

  return response
}
