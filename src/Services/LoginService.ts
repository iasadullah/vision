import { fetchPost } from './NetWorkServices'

export const LoginService = async (
  endpoint: string,
  requestData: {
    email: string
    password: string
  }
) => {
  const response = await fetchPost(endpoint, requestData)

  return response
}

export const SignUpService = async (
  endpoint: string,
  requestData: {
    email: string
    password: string
    contact: number
    name: string
    city: string
    degree: string
  }
) => {
  const response = await fetchPost(endpoint, requestData)

  return response
}
