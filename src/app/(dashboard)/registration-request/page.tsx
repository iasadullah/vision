'use client'
import EmployeeTable from '@/views/EmployeeTable'
import { withAuth } from '@/components/withAuth'

const Page = () => {
  return (
    <h1>
      Registration Access:
      <br />
      {/* <StepperAlternativeLabel /> */}
      <EmployeeTable />
    </h1>
  )
}

export default withAuth(Page, ['admin'])
