'use client'

import { withAuth } from '@/components/withAuth'

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. This page is only accessible to admin users.</p>
    </div>
  )
}

export default withAuth(AdminDashboard, ['admin'])
