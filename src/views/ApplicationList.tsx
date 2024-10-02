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
  return (
    <>
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
