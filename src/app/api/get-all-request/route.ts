import { NextResponse } from 'next/server'

const API_URL = 'https://springkotlin-production.up.railway.app/api/users/all'

export async function GET(request: Request) {
  try {
    // Get the Bearer token from the request headers
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Bearer token' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    // Prepare the URL with the query parameter
    const url = new URL(API_URL)

    url.searchParams.append('type', 'inreview')

    // Make the request to the external API
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Return the data from the external API
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET request:', error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
