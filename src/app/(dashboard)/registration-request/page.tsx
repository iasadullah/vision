'use client'
import EmployeeTable from '@/views/EmployeeTable'
import { withAuth } from '@/components/withAuth'

const Page = () => {
  return (
    <div>
      <h1>User Requests</h1>
      <br />
      <EmployeeTable />
    </div>
  )
}

export default withAuth(Page, ['admin'])
