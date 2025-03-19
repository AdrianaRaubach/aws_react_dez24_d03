import { useState, useEffect } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { CurrentPage } from '../components/CurrentPage'
import { Link } from 'react-router-dom'
import { ModalErrorSuccess } from '../components/ModalErrorSuccess'
import { Loading } from '../components/Loading'
import { ValidateForm } from '../utils/ValidateForm'
import { GoogleSignInButton } from '../components/GoogleSignInButton'

export const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const [emailAddress, setEmailAddress] = useState('')
    const [fullName, setFullName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [verifying, setVerifying] = useState(false)
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const [isSending, setIsSending] = useState('Create account')
    const [isVerifying, setIsVerifying] = useState('Verify')
    const [errors, setErrors] = useState({
        error: false,
        errorMessage:''
    })

    useEffect(() => {
        const nameParts = fullName.split(' ')
        setFirstName(String(nameParts[0]))
        setLastName(String(nameParts.slice(1).join(' ')))
    },[fullName])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        ValidateForm({fullName, emailAddress, password}, setErrors)
        if(!ValidateForm({fullName, emailAddress, password}, setErrors)) return
        
        setIsSending('is Sending')

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            })
            setErrors((prev) => ({...prev, error:false, errorMessage: "Success" }))
            setTimeout(() => {
                setErrors((prev) => ({...prev, errorMessage: "" }))
                setVerifying(true)
            }, 500);

        } catch (err: any) {
            const errors = JSON.stringify(err.errors[0].message)
            setErrors((prev) => ({...prev, error:true, errorMessage: errors }))
            setIsSending('Create account')
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        setErrors((prev) => ({...prev, errorMessage: "" }))

        setIsVerifying('is Sending')

        if (!isLoaded) return

        try {

            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })
            if (completeSignUp.status === 'complete') {
                setErrors((prev) => ({...prev, error:false, errorMessage: "Success" }))
                await setActive({ session: completeSignUp.createdSessionId })
                navigate('/')
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err: any) {
            const errors = JSON.stringify(err.errors[0].message)
            setErrors((prev) => ({...prev, error:true, errorMessage: errors }))
            setIsVerifying('Verify')
        }
    }

    if (verifying) {
        return (
            <main className='dark:bg-bk-800 pb-35 mt-34'>
                <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                    <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Sign up</h2>
                    <CurrentPage actualPage="Sign up" />
                </div>
                {errors.errorMessage !== '' && <div className='fixed right-10'> 
                    <ModalErrorSuccess error={errors.error} message={errors.errorMessage} 
                    onClick={() => setErrors((prev) => ({...prev, errorMessage: "" }))}/>
                    </div>
                }
                <div className='flex flex-col items-center w-full pt-35'>
                    <form className='flex flex-col w-80 gap-6' onSubmit={handleVerify}>
                        <label className='text-md text-bk-700 dark:text-w-100 font-semibold -mb-4'
                            id="code">Enter your verification code
                        </label>
                        <input className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100' 
                            value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} 
                        />
                        <button className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm' 
                            type="submit">
                            {isVerifying === 'is Sending'? <Loading text={isVerifying}/>: isVerifying}
                        </button>
                    </form>
                    {errors.errorMessage === '"Too many requests. Please try again in a bit."' && 
                        <Link className='text-sm text-bk-700 dark:text-gray-400 cursor-pointer hover:opacity-85 underline mt-3' to="/">
                            Go to Home
                        </Link>
                    }
                    {errors.errorMessage === '"failed"' && 
                        <button className='text-sm text-bk-700 dark:text-gray-400 cursor-pointer underline mt-3 hover:opacity-85' 
                            onClick={()=> setVerifying(false)}>
                            Try Again
                        </button>
                    }
                </div>
            </main>
        )
    }
    return (
        <main className='font-inter dark:bg-bk-800 mt-34'>
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Sign up</h2>
                <CurrentPage actualPage="Sign up" />
            </div>
            {errors.errorMessage !== '' && <div className='fixed right-10'> <ModalErrorSuccess error={errors.error} message={errors.errorMessage} 
                onClick={() => setErrors((prev) => ({...prev, errorMessage: "" }))}/>
                </div>
            }
            <div className='flex flex-col items-center w-full py-35'>
                <div className='w-80'>
                    <GoogleSignInButton/>
                    <div className='flex items-center gap-4 my-10'>
                        <hr className='w-35 text-bk-100' />
                        <p className='font-inter text-xs font-medium text-bk-500'>OR</p>
                        <hr className='w-35 text-bk-100' />
                    </div>
                </div>
                <form className='flex flex-col w-80 gap-4' noValidate onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="name">Name</label>
                        <input
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                            id="name"
                            type="name"
                            name="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="email">Email</label>
                        <input
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                            id="email"
                            type="email"
                            name="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="password">Password</label>
                        <input
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
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
                        <p className='text-bk-500 text-xs dark:text-gray-400 leading-6'>By creating an account you agree with our Terms of Service, Privacy Policy.</p>
                        <button className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm' 
                            type="submit">{isSending === 'is Sending'? <Loading text={isSending}/>: isSending}
                        </button>
                        <Link to='/login' className='self-center text-bk-500 dark:text-gray-400 text-sm hover:opacity-85'>Already have an account? Log in</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}