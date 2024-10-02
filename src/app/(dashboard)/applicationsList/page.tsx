'use client'

import ApplicationsTable from '@/views/ApplicationsTable'

// import StepperAlternativeLabel from '@/views/StepperAlternativeLabel'

export default function Page() {
  return (
    <h1>
      Grant Applications
      <br />
      {/* <StepperAlternativeLabel /> */}
      <ApplicationsTable />
    </h1>
  )
}
