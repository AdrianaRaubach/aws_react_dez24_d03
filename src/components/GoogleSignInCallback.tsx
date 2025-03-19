import { useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Loading } from './Loading';

export const GoogleSignInCallback = () => {
  const { handleRedirectCallback } = useClerk()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback({})
        navigate('/')
      } catch (error) {
        console.error(error)
        navigate('/login')
      }
    }

    handleCallback()
  }, [handleRedirectCallback, navigate])

  return <Loading text='Loading'/>
}