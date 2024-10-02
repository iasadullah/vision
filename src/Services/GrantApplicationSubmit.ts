import ApiNames from '@/constants/ApiNames'
import { fetchPost } from './NetWorkServices'

export const GrantApplicationSubmitServices = async (requestData: any) => {
  const endpoint = ApiNames.grantApplicationSubmit
  const response = await fetchPost(endpoint, requestData)

  return response
}
