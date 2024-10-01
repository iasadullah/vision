import { fetchPut } from './NetWorkServices'

export const UpdateAlumniStatus = async (
  endpoint: string,
  requestData: {
    userId: number
    status: string
  }
) => {
  const response = await fetchPut(endpoint, requestData)

  return response
}
