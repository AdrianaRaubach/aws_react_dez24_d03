
import React, { useEffect, useState } from 'react'
import { useAuth, useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { CurrentPage } from '../components/CurrentPage'
import { ModalErrorSuccess } from '../components/ModalErrorSuccess'
import { ValidateForm } from '../utils/ValidateForm'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const navigate = useNavigate()
    const { isSignedIn } = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()
    const [errors, setErrors] = useState({
        error: false,
        errorMessage:''
      })

    useEffect(() => {
        if (isSignedIn) {
            navigate('/')
        }
    }, [isSignedIn, navigate])

    if (!isLoaded) {
        return null
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()

        if(!successfulCreation) {
            ValidateForm({emailAddress:email}, setErrors)
            if(!ValidateForm({emailAddress:email}, setErrors)) return
            create(e)
        } else {
            ValidateForm({password, confirmedPassword, code}, setErrors)
            if(!ValidateForm({password, confirmedPassword, code}, setErrors)) return
            reset(e)
        }
    }

    async function create(e: React.FormEvent) {
        e.preventDefault()
        await signIn
        ?.create({
            strategy: 'reset_password_email_code',
            identifier: email,
        })
        .then(() => {
            setSuccessfulCreation(true)
            setErrors((prev) => ({...prev, error:false, errorMessage: "Code sent to the email provided" }))
            setTimeout(() => {
                setErrors((prev) => ({...prev, errorMessage: "" }))
            }, 5000);
        })
        .catch((err) => {
            console.error('error', err.errors[0].longMessage)
            setErrors((prev) => ({...prev, error:true, errorMessage: err.errors[0].longMessage}))
        })
    }

    async function reset(e: React.FormEvent) {
        e.preventDefault()
        await signIn
        ?.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code,
            password,            
        })
        .then((result) => {
            if (result.status === 'complete') {
                setActive({ session: result.createdSessionId })
                setErrors((prev) => ({...prev, error:false, errorMessage: "Success"}))
            } else {
                setErrors((prev) => ({...prev, error:true, errorMessage: String(result)}))
            }
        })
        .catch((err) => {
            console.error('error', err.errors[0].longMessage)
            setErrors((prev) => ({...prev, error:true, errorMessage: err.errors[0].longMessage}))
        })
    }

    return (
        <main className='font-inter dark:bg-bk-800 mt-34'>
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Forgot Password</h2>
                <CurrentPage actualPage="Forgot Password" />
            </div>
            {errors.errorMessage !== '' && 
                <div className='fixed right-10'> 
                    <ModalErrorSuccess error={errors.error} message={errors.errorMessage} onClick={() => setErrors((prev) => ({...prev, errorMessage: ""}))}/>
                </div>
            }
            <div className='flex flex-col items-center w-full py-35'>
                <form className='flex flex-col w-80 gap-4' noValidate onSubmit={handleSubmit}>
                    {!successfulCreation && (
                        <div className='flex flex-col gap-8'>
                            <p className='text-sm text-bk-600 dark:text-gray-400'>Please enter the email address associated with your account. We'll promptly send you a link to reset your password.</p>
                            <div className='flex flex-col'>
                                <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="email">Email</label>
                                <input
                                    className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                                Send reset code
                            </button>
                        </div>
                    )}

                    {successfulCreation && (
                        <div className='flex flex-col gap-8'>
                            <div className='flex flex-col'>
                                <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="password">New password</label>
                                <input type="password" 
                                    className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="password">Confirm password</label>
                                <input type="password" 
                                    className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                                    value={confirmedPassword} 
                                    onChange={(e) => setConfirmedPassword(e.target.value)} 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label className='text-bk-600 dark:text-gray-400 font-medium text-sm' htmlFor="password">
                                    Enter password reset code
                                </label>
                                <input type="code" 
                                    value={code} 
                                    onChange={(e) => setCode(e.target.value)} 
                                    className='border border-bk-100 dark-border-bk-700 p-2 rounded-md text-bk-900 dark:text-w-100'
                                />
                            </div>

                            <button className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                                Reset Password
                            </button>
                            {errors.errorMessage === 'This verification has expired. You must create a new one.'&&
                                <button className='text-sm text-bk-500 dark:text-gray-400 underline cursor-pointer hover:opacity-85' onClick={()=>setSuccessfulCreation(false)}>The code has expired, Try again</button>
                            }
                        </div>
                    )}
                </form>
            </div>
        </main>
    )
}