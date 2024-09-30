const _Url = 'https://springkotlin-production.up.railway.app/api'

const handleLogoutClick = () => {
  localStorage.removeItem('key')
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  global.authToken = undefined
  window.location.href = '/login'
}

export const fetchGet = async (apiName: string) => {
  console.log('url', _Url + apiName)

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.authToken
    }
  })

  if (response.status === 401) {
    handleLogoutClick()
  }

  const jsonResponse = await response.json()

  return jsonResponse
}

export const fetchPost = async (apiName: string, data: {}) => {
  const response = await fetch(`${_Url}${apiName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + global.authToken
    },
    body: JSON.stringify(data)
  })

  if (response.status === 401) {
    handleLogoutClick()
  }

  const jsonResponse = await response.json()

  return jsonResponse
}
