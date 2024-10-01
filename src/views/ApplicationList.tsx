import React from 'react'

import Grid from '@mui/material/Grid'

import BasicDataTables from '@components/BasicDataTables'

type Props = {
  userListData: any
}

const ApplicationList = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <BasicDataTables userListData={props.userListData} />
      </Grid>
    </Grid>
  )
}

export default ApplicationList
