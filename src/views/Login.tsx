'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'
import type { FormikProps } from 'formik'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { LoginService } from '../Services/LoginService'
import ApiNames from '@/constants/ApiNames'
import { useUserContext } from '@/context/UserContext'

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}|:"<>?[\]\\;',./`~]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
    )
})

interface LoginFormValues {
  email: string
  password: string
}

const LoginV2 = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Vars
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const { handleUserData } = useUserContext()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/home')
    }
  }, [router])

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true)
    setErrorMsg('')

    try {
      const response = await LoginService(ApiNames.login, {
        email: values.email,
        password: values.password
      })

      if (typeof response.result === 'object') {
        handleUserData(response.result) // Update user data in context
        localStorage.setItem('profile', JSON.stringify(response.result))
        localStorage.setItem('role', response.result.role)
        localStorage.setItem('token', response.result.token)

        if (typeof window !== 'undefined') {
          ;(window as any).authToken = response.result.token
        }

        router.push('/home')
      } else {
        setErrorMsg(response.message || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)

      // Extract the error message from the error object
      const errorMessage =
        error instanceof Error && error.message && typeof error.message === 'string'
          ? JSON.parse(error.message).result || 'An error occurred during login'
          : 'An error occurred during login'

      setErrorMsg(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
          image1={{ src: '/images/illustrations/objects/tree-2.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}`}</Typography>
            {/* <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography> */}
          </div>
          <Formik initialValues={{ email: '', password: '' }} validationSchema={SignupSchema} onSubmit={handleLogin}>
            {({ errors, touched }: FormikProps<LoginFormValues>) => (
              <Form className='flex flex-col gap-5'>
                <Field
                  as={TextField}
                  name='email'
                  label='Email'
                  fullWidth
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name='password'
                  label='Password'
                  type={isPasswordShown ? 'text' : 'password'}
                  fullWidth
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
                <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
                  <FormControlLabel control={<Checkbox />} label='Remember me' />
                  <Typography className='text-end' color='primary' component={Link}>
                    Forgot password?
                  </Typography>
                </div>
                {errorMsg && (
                  <Typography color='error' align='center'>
                    {errorMsg}
                  </Typography>
                )}
                <Button
                  fullWidth
                  variant='contained'
                  type='submit'
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null}
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>New on our platform?</Typography>
                  <Typography component={Link} href='/register' color='primary'>
                    Create an account
                  </Typography>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
