import React from 'react'

import Grid from '@mui/material/Grid'

import { Box, Button, CircularProgress, Typography } from '@mui/material'

import BasicDataTables from '@components/BasicDataTables'

type Props = {
  userListData: any
  isLoading: boolean
  errorMsg: string
  goBackClick: () => void
}

const ApplicationList = (props: Props) => {
  const flattenData = (data: any): string[] => {
    const flatData: string[] = []
    const applicant = data.applicantDetail
    const employment = data.employmentStatus
    const exchange = data.exchangeInfo
    const summary = data.executiveSummary
    const project = data.projectDescription
    const user = data.user

    const header = [
      'Applicant Name',
      'City',
      'Contact',
      'Email',
      'Gender',
      'DOB',
      'Postal Address',
      'Employment Status',
      'Organization Name',
      'Designation',
      'Area of Work',
      'Program Name',
      'Host Institution',
      'Program Completion Date',
      'Summary What',
      'Summary Where',
      'Summary When',
      'Summary How',
      'Summary Why',
      'Summary Who',
      'Summary Direct Beneficiaries',
      'Summary InDirect Beneficiaries',
      'Project Title',
      'Project Duration',
      'Course Start Date',
      'Course End Date',
      'Proposed Venue',
      'Is Letter Attached',
      'Total Training Hours',
      'Hours Per Week',
      'Days Per Week',
      'Hours Per Class',
      'Total Audience',
      'Male Audience',
      'Female Audience',
      'User ID',
      'User Email',
      'User Name',
      'User Contact',
      'User DOB',
      'User City',
      'User Employment Region',
      'User Attending Year',
      'User Status',
      'User Role',
      'Created At'
    ]

    flatData.push(header.join(',')) // Add header row

    const row = [
      applicant.fullName,
      applicant.city,
      applicant.contact,
      applicant.email,
      applicant.gender,
      applicant.dob,
      applicant.postalAddress,
      employment.employmentStatus,
      employment.organizationName,
      employment.designation,
      employment.areaOfWork,
      exchange.programName,
      exchange.hostInstitution,
      exchange.programCompletionDate,
      summary.summaryWhat,
      summary.summaryWhere,
      summary.summaryWhen,
      summary.summaryHow,
      summary.summaryWhy,
      summary.summaryWho,
      summary.summaryDirectBeneficiaries,
      summary.summaryInDirectBeneficiaries,
      project.projectTitle,
      project.projectDuration,
      project.courseStartDate,
      project.courseEndDate,
      project.proposedVenue,
      project.isLetterAttached.toString(),
      project.totalTrainingHours,
      project.hoursPerWeek,
      project.daysPerWeek,
      project.hoursPerClass,
      project.totalAudience,
      project.maleAudience,
      project.femaleAudience,
      user.id,
      user.email,
      user.name,
      user.contact,
      user.dob,
      user.city,
      user.employmentReqion,
      user.attendingYear,
      user.status,
      user.role,
      props.userListData.createdAt
    ]

    flatData.push(row.join(',')) // Add data row

    return flatData
  }

  const handleExportCSV = () => {
    const csvData = flattenData(props.userListData)
    const csvString = csvData.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'application_data.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {props.userListData ? (
        <Button
          variant='contained'
          type='submit'
          onClick={() => {
            handleExportCSV()
          }}
          style={{ marginBottom: '20px' }}
        >
          Export Csv
        </Button>
      ) : (
        <></>
      )}

      {props.isLoading ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='300px'>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={6}>
          {props.errorMsg ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: '200px',
                flexDirection: 'column'
              }}
            >
              <Typography color='error' align='center'>
                {props.errorMsg}
              </Typography>
              <Button type='reset' variant='outlined' style={{ marginTop: '15px' }} onClick={props.goBackClick}>
                Go Back
              </Button>
            </div>
          ) : (
            <Grid item xs={12}>
              <BasicDataTables userListData={props.userListData} />
            </Grid>
          )}
        </Grid>
      )}
    </>
  )
}

export default ApplicationList
