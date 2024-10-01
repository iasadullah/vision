'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import classnames from 'classnames'

// Third-party Imports
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import type { FormikHelpers } from 'formik'

import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// import Loading from '@/views/loading'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { SignUpService } from '@/Services/RegisterService'
import ApiNames from '@/constants/ApiNames'

// import { registerUser } from '@/app/api/Auth/register/auth'

const RegisterV2 = ({ mode }: { mode: Mode }) => {
  const router = useRouter()

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const { settings } = useSettings()

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const employmentRegions = [
    'Islamabad',
    'Punjab',
    'Khyber Pakhtunkhwa',
    'Sindh',
    'Balochistan',
    'Gilgit Baltistan',
    'Azad Jammu & Kashmir'
  ]

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(12, 'Password must not exceed 12 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d!@#$%^&*]{8,12}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 8-12 characters long'
      )
      .required('Password is required'),
    contact: Yup.number().typeError('Contact must be a number').required('Contact is required'),
    name: Yup.string().required('Name is required'),
    city: Yup.string().required('City is required'),
    employmentReqion: Yup.string()
      .oneOf(employmentRegions, 'Please select a valid employment region')
      .required('Employment region is required'),
    dob: Yup.date().required('Date of birth is required'),
    attendingYear: Yup.number().typeError('Attending year must be a number').required('Attending year is required'),
    agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
  })

  const initialValues = {
    email: '',
    password: '',
    contact: '',
    name: '',
    city: '',
    employmentReqion: '',
    dob: '',
    attendingYear: '',
    agreeTerms: false
  }

  // Define FormValues type to match your initialValues
  type FormValues = {
    email: string
    password: string
    contact: string
    name: string
    city: string
    employmentReqion: string
    dob: string // Ensure this is a string, not string[]
    attendingYear: string
    agreeTerms: boolean
  }

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await SignUpService(ApiNames.signup, {
        email: values.email,
        password: values.password,
        contact: Number(values.contact),
        name: values.name,
        city: values.city,
        employmentReqion: values.employmentReqion,
        attendingYear: values.attendingYear,
        dob: values.dob
      })

      // If we reach here, it means the request was successful
      console.log('Signup successful', response)

      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })

      // Navigate to login page
      router.push('/login')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup failed:', error.message)
        toast.error(error.message || 'Registration failed. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      } else {
        console.error('Signup failed:', error)
        toast.error('Registration failed. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className='flex bs-full justify-center'>
        <div
          className={classnames(
            'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
            {
              'border-ie': settings.skin === 'bordered'
            }
          )}
        >
          <div className='plb-12 pis-12'>
            <img
              src={characterIllustration}
              alt='character-illustration'
              className='max-bs-[500px] max-is-full bs-auto'
            />
          </div>
          <Illustrations
            image1={{ src: '/images/illustrations/objects/tree-3.png' }}
            image2={null}
            maskImg={{ src: authBackground }}
          />
        </div>
        <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          <Link
            href={'/'}
            className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'
          >
            <Logo />
          </Link>

          <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
            <div>
              {/* <Typography variant='h4'>Learning starts from here</Typography>
              <Typography className='mbe-1'>Powered by AI generative tools</Typography> */}
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ errors, touched, isSubmitting }) => (
                <Form className='flex flex-col gap-5'>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='email'
                        fullWidth
                        label='Email'
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='password'
                        fullWidth
                        label='Password'
                        type={isPasswordShown ? 'text' : 'password'}
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                size='small'
                                edge='end'
                                onClick={handleClickShowPassword}
                                onMouseDown={e => e.preventDefault()}
                              >
                                <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='contact'
                        fullWidth
                        label='Contact'
                        type='tel'
                        error={touched.contact && errors.contact}
                        helperText={touched.contact && errors.contact}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='name'
                        fullWidth
                        label='Name'
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='city'
                        fullWidth
                        label='City'
                        error={touched.city && errors.city}
                        helperText={touched.city && errors.city}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name='employmentReqion'
                        as={Select}
                        fullWidth
                        label='Employment Region'
                        error={touched.employmentReqion && errors.employmentReqion}
                        helperText={touched.employmentReqion && errors.employmentReqion}
                      >
                        {employmentRegions.map(region => (
                          <MenuItem key={region} value={region}>
                            {region}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='dob'
                        fullWidth
                        label='Date of Birth'
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        error={touched.dob && errors.dob}
                        helperText={touched.dob && errors.dob}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name='attendingYear'
                        fullWidth
                        label='Attending Year'
                        error={touched.attendingYear && errors.attendingYear}
                        helperText={touched.attendingYear && errors.attendingYear}
                      />
                    </Grid>
                  </Grid>

                  <div className='flex justify-between items-center gap-3'>
                    <FormControlLabel
                      control={<Field as={Checkbox} name='agreeTerms' color='primary' />}
                      label={
                        <>
                          <span>I agree to </span>
                          <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                            privacy policy & terms
                          </Link>
                        </>
                      }
                    />
                  </div>
                  {errors.agreeTerms && touched.agreeTerms && (
                    <Typography color='error'>{errors.agreeTerms}</Typography>
                  )}
                  {error && <Typography color='error'>{error}</Typography>}
                  <Button fullWidth variant='contained' type='submit' disabled={isSubmitting || isLoading}>
                    Sign Up
                  </Button>
                  <div className='flex justify-center items-center flex-wrap gap-2'>
                    <Typography>Already have an account?</Typography>
                    <Typography component={Link} href='/login' color='primary'>
                      Sign in instead
                    </Typography>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterV2
