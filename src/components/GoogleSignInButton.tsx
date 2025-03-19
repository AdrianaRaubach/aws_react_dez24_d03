import { useSignIn } from '@clerk/clerk-react';
import GoogleLogo from '../images/icons/Google.png'

export const GoogleSignInButton = () => {
  const { signIn } = useSignIn()

  const handleGoogleSignIn = async () => {
    if(signIn){
      try {
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: '/google-callback',
          redirectUrlComplete:'/'
        })
      } catch (error) {
          console.error(error)
      }
    }
  }

  return (
    <button onClick={handleGoogleSignIn} className='flex gap-2 text-bk-500 border border-bk-200 w-full justify-center text-sm font-inter items-center rounded-md py-2 dark:text-gray-400 hover:bg-w-100 dark:hover:bg-bk-700 cursor-pointer'>
      <img src={GoogleLogo} alt="google" />
        Continue with Google
    </button>
  )
}