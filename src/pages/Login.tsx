import { useState } from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { CurrentPage } from '../components/CurrentPage'
import { Link } from 'react-router-dom'
import { ModalErrorSuccess } from '../components/ModalErrorSuccess'
import { Loading } from '../components/Loading'

export const Login = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSending, setIsSending] = useState('Login')
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      if (!isLoaded) return
  
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        })

        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          navigate('/')
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2))
      }
    }
  
    return (
        <main className='font-inter dark:bg-bk-800 mt-34'>
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Login</h2>
                <CurrentPage actualPage="Login" />
            </div>
            {errorMessage !== '' && <div className='fixed right-10'> <ModalErrorSuccess error={error} message={errorMessage} onClick={() => setErrorMessage('')}/></div>}
            <div className='flex flex-col items-center w-full py-35'>
                <form className='flex flex-col w-80 gap-4' noValidate onSubmit={handleSubmit}>
                    <div>Google component</div>
                    <div className='flex flex-col'>
                        <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="email">Email</label>
                        <input
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md'
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="password">Password</label>
                        <input
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md'
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <div id="clerk-captcha"></div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <Link to="/reset-password" className='font-medium self-end text-bk-600 text-xs dark:text-gray-400'>Forgot Password?</Link>
                        <button className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm' 
                            type="submit">{isSending === 'is Sending'? <Loading text={isSending}/>: isSending}
                        </button>
                        <Link to='/sign-up' className='self-center text-bk-500 dark:text-gray-400 text-sm'>Don't have an account? Sign up</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}