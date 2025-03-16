import { CurrentPage } from "../components/CurrentPage"
import CartPng from '../images/icons/cart.png'
import ProfilePng from '../images/icons/profile.png'
import LogoutPng from '../images/icons/logout.png'
import { useClerk } from '@clerk/clerk-react'
import { ProfileImage } from "../components/ProfileImage"
import { useState } from "react"

export const Profile = () => {
    const { signOut } = useClerk()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    return (
        <main className='font-inter dark:bg-bk-800 mt-34'>
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">My Account</h2>
                <CurrentPage actualPage="My Account" />
            </div>
            <div className="flex px-10 md:px-20 lg:px-45">
                <nav className="border-r border-w-200">
                    <ul>
                        <li className="flex items-center gap-3 text-bk-500 dark:text-gray-400 py-2 px-4 text-sm font-medium">
                            <img src={CartPng} alt="cart" />
                            Orders
                        </li>
                        <li className="flex items-center gap-3 text-bk-500 dark:text-gray-400 py-2 px-4 text-sm font-medium">
                            <img src={ProfilePng} alt="profile" />
                            Profile
                        </li>
                        <li>
                            <button className="flex items-center gap-3 text-bk-500 dark:text-gray-400 py-2 px-4 text-sm font-medium" 
                                onClick={() => signOut({ redirectUrl: '/' })}>
                                <img src={LogoutPng} alt="logout" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
                <div>
                    <h3>Account Details</h3>
                    <ProfileImage/>
                    <div className="flex flex-col">
                        <label htmlFor="full-name" className='text-bk-600 dark:text-gray-400 font-medium text-sm'>Full name</label>
                        <input type="text" 
                            name="full-name" 
                            id="full-name" 
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md'
                            disabled value={fullName} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className='text-bk-600 dark:text-gray-400 font-medium text-sm'>Email</label>
                        <input type="email" 
                            name="email" 
                            id="email" 
                            className='border border-bk-100 dark-border-bk-700 p-2 rounded-md'
                            disabled value={email} 
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}