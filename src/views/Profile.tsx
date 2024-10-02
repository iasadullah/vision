'use client'

import React from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import classnames from 'classnames'
import { Box, CircularProgress } from '@mui/material'

interface IAgentProfileProps {
  agentProfile: any
  handleInputChange: (e: any) => void
  handleCancelClick: () => void
  handleSaveClick: () => void
  originalProfile: any
  errorMsg: string
  isLoading: boolean
  saveLoading: boolean
}

const Profile = (props: IAgentProfileProps) => {
  return (
    <>
      {props.isLoading ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='200px'>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <Typography variant='caption' className='uppercase'>
                    About
                  </Typography>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-user-3-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Full Name:</Typography>
                      <Typography>{props.originalProfile?.name}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-user-3-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>DOB:</Typography>
                      <Typography>{props.originalProfile?.dob}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-check-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Status:</Typography>
                      <Typography>{props.originalProfile?.status}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-star-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Role:</Typography>
                      <Typography>{props.originalProfile?.role}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-flag-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>City:</Typography>
                      <Typography>{props.originalProfile?.city}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-user-3-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Attending Year:</Typography>
                      <Typography>{props.originalProfile?.attendingYear}</Typography>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-user-3-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Employment Reqion:</Typography>
                      <Typography>{props.originalProfile?.employmentReqion}</Typography>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <Typography variant='caption' className='uppercase'>
                    Contacts
                  </Typography>
                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-mail-open-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Email:</Typography>
                      <Typography>{props.originalProfile?.email}</Typography>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <i className={classnames('ri-phone-line', 'text-textSecondary')} />
                    <div className='flex items-center flex-wrap gap-2'>
                      <Typography className='font-medium'>Contact:</Typography>
                      <Typography>{props.originalProfile?.contact}</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <CardHeader title='Edit Profile' />
              <Divider />
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='First Name'
                        name='name'
                        placeholder='Enter your first name'
                        value={props.agentProfile?.name || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='DOB'
                        name='dob'
                        placeholder='Enter your DOB'
                        value={props.agentProfile?.dob || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='City'
                        name='city'
                        placeholder='Enter your City'
                        value={props.agentProfile?.city || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Attending Year'
                        name='attendingYear'
                        placeholder='Enter your Attending Year'
                        value={props.agentProfile?.attendingYear || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Employment Reqion'
                        name='employmentReqion'
                        placeholder='Enter your Employment Reqion'
                        value={props.agentProfile?.employmentReqion || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Contact'
                        name='contact'
                        placeholder='Enter your Contact'
                        value={props.agentProfile?.contact || ''}
                        onChange={props.handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    onClick={() => {
                      if (props.saveLoading === false) {
                        props.handleSaveClick()
                      }
                    }}
                    type='submit'
                    variant='contained'
                    className='mie-2'
                    startIcon={props.saveLoading ? <CircularProgress size={20} color='inherit' /> : null}
                  >
                    {props.saveLoading ? 'Submiting...' : 'Submit'}
                  </Button>

                  <Button type='reset' variant='outlined' onClick={props.handleCancelClick}>
                    Reset
                  </Button>
                  {props.errorMsg && (
                    <Typography color='error' align='center'>
                      {props.errorMsg}
                    </Typography>
                  )}
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Profile
