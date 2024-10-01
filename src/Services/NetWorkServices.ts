declare global {
  interface Window {
    authToken: string | undefined
  }
}

const _Url = 'https://springkotlin-production.up.railway.app/api'

// const _Url = '192.168.50.160:8080/api'

let _token: any = ''

const handleLogoutClick = () => {
  localStorage.removeItem('key')
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  window.authToken = undefined
  window.location.href = '/login'
}

export const fetchGet = async (apiName: string) => {
  _token = localStorage.getItem('token')
  console.log('url', _Url + apiName)

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _token
    }
  })

  if (response.status === 401) {
    handleLogoutClick()
  }

  const jsonResponse = await response.json()

  return jsonResponse
}

export const fetchPost = async (apiName: string, data: {}) => {
  _token = localStorage.getItem('token')

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _token
    },
    body: JSON.stringify(data)
  })

  if (response.status === 401) {
    handleLogoutClick()
  }

  const jsonResponse = await response.json()

  return jsonResponse
}
