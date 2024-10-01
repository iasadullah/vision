import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/')

  console.log('Proxying GET request to:', path)

  const targetUrl = new URL(path, 'https://springkotlin-production.up.railway.app')

  console.log('Target URL:', targetUrl.toString())

  // Get the authorization header from the incoming request
  const authHeader = request.headers.get('Authorization')

  console.log('Authorization header:', authHeader) // Log the auth header

  try {
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

        // Include the Authorization header if it exists
        ...(authHeader && { Authorization: authHeader })
      }
    })

    console.log('Response status:', response.status) // Log the response status

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)

    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 })
  }
}
