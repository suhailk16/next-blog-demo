import { FormEventHandler, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import { LineWave, RotatingLines } from 'react-loader-spinner'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { login } from '../store/store'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email!')
    .required('Your email is required!'),
  password: Yup.string()
    .min(6, 'Too short password, please try again!')
    .max(50, 'Too long password')
    .required('Your password is required!'),
})

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      try {
        setError('')
        setLoading(true)
        const jsonRes = await fetch('/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
        const res = await jsonRes.json()
        if (res.error) {
          setError(res.message)
        } else {
          dispatch(
            login({
              dateCreated: res.dateCreated,
              name: res.name,
              email: res.email,
              id: res.id,
              imageUrl: res.imageUrl,
            }),
          )
          localStorage.setItem('loggedIn', 'YES')
          localStorage.setItem('userId', res.id)
          router.push('/')
        }
      } catch (error) {
        console.log('Failure API Call: ', error)
        setError('An unknown error occurred, please try again')
      } finally {
        setLoading(false)
      }
    },
  })

  const { values, errors, setFieldValue } = formik

  return (
    <FormikProvider value={formik}>
      <div>
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                      setFieldValue('email', event.target.value)
                    }
                    autoComplete="email"
                    required
                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={(event) =>
                      setFieldValue('password', event.target.value)
                    }
                    autoComplete="current-password"
                    required
                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  {loading ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
                    />
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormikProvider>
  )
}

export default LoginPage

/*

  upload from the front-end
    grab at the back-end
    upload to cloud storage service s3
    grab the upload url (imageUrl)
    store the imageUrl to the database

*/
