import { fetchGet } from './NetWorkServices'

export const getUserApplications = async (endpoint: string) => {
  const response = await fetchGet(endpoint)

  return response
}
