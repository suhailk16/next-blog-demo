import { Provider, useDispatch, useSelector } from 'react-redux'
import '../styles/globals.css'
import store, { login } from '../store/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const protectedRoutes = ['/', '/create-post', '/profile', '/blog']

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isAppReady, setIsAppReady] = useState(false)
  // @ts-ignore
  const auth = useSelector((state) => state.auth)

  const fetchProfile = async () => {
    const userId = localStorage.getItem('userId')
    const jsonRes = await fetch(`/api/profile?id=${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const res = await jsonRes.json()

    dispatch(
      login({
        dateCreated: res.dateCreated,
        name: res.name,
        email: res.email,
        id: res.id,
        imageUrl: res.imageUrl,
      }),
    )
    setIsAppReady(true)
  }

  useEffect(() => {
    const containsInProtectedRoute = protectedRoutes.find((route) =>
      router.pathname.startsWith(route),
    )
    if (
      containsInProtectedRoute &&
      localStorage.getItem('loggedIn') !== 'YES'
    ) {
      // if we are not logged in redirect the user to login page
      router.push('/login')
      setIsAppReady(true)
    } else {
      // if we are logged in then fetch the user information

      fetchProfile()
    }
  }, [auth.id])

  if (!isAppReady) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

function Root(props) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  )
}

export default Root
