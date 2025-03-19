import { CurrentPage } from "../components/CurrentPage"
import CartPng from '../images/icons/cart.png'
import ProfilePng from '../images/icons/profile.png'
import LogoutPng from '../images/icons/logout.png'
import { useClerk } from '@clerk/clerk-react'
import { ProfileImage } from "../components/ProfileImage"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react";
import { Btn } from "../components/Btn"
import EmptyPng from "../images/icons/empty.png"
import api from "../service/api"
import { OrdersByUser } from "../types/PropTypes"
import { FormatDolar } from '../utils/FormatDolar'
import { Link } from "react-router-dom"

export const Profile = () => {
    const { signOut } = useClerk()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [subMenu, setSubMenu] = useState('orders')
    const [hasOrders, setHasOrders] = useState<boolean>(false)
    const [orders, setOrders] = useState([])
    const user = useUser();

    useEffect(()=> {
        setFullName(String(user.user?.fullName))
        setEmail(String(user.user?.emailAddresses))
    },[])

    useEffect(() => {
        if(user.user) {
            api.get('/orders', {
                params: {
                    userId: user.user.id
                }
            
            }).then(response => {
                setOrders(response.data)
            })
        }
    },[])
    
    useEffect(() => {
        if(orders!==undefined && orders.length > 0) {
            setHasOrders(true)
        }
    },[orders])
    
    return (
        <main className='font-inter dark:bg-bk-800 mt-34'>
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">My Account</h2>
                <CurrentPage actualPage="My Account" />
            </div>
            <div className="flex w-full px-10 md:px-20 lg:px-45 pb-30">
                <nav className="border-r border-w-200 dark:border-bk-600 w-60 my-15 pt-20 pb-60">
                    <ul className="flex flex-col gap-4 mr-10">
                        <li className={`cursor-pointer flex items-center gap-3 py-2 px-4 text-sm font-medium hover:bg-w-100 hover:text-bk-900 rounded md w-full 
                            ${subMenu === 'orders'? ' bg-w-100 text-bk-900':'text-bk-500 dark:text-gray-400' }`}
                            onClick={()=> setSubMenu('orders')}
                        >
                            <img src={CartPng} alt="cart" />
                            Orders
                        </li>
                        <li className={`cursor-pointer flex items-center gap-3 py-2 px-4 text-sm font-medium hover:bg-w-100 hover:text-bk-900 rounded md w-full 
                            ${subMenu === 'profile'? ' bg-w-100 text-bk-900':'text-bk-500 dark:text-gray-400' }`}
                            onClick={() => setSubMenu('profile')}
                        >
                            <img src={ProfilePng} alt="profile" />
                            Profile
                        </li>
                        <li>
                            <button className="cursor-pointer flex items-center gap-3 text-bk-500 dark:text-gray-400 py-2 px-4 text-sm font-medium hover:bg-w-100 hover:text-bk-900 rounded md w-full" 
                                onClick={() => signOut({ redirectUrl: '/' })}>
                                <img src={LogoutPng} alt="logout" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
                {(subMenu === 'profile') && 
                    <div className="mt-15 flex flex-col gap-8 ml-12 w-9/12">
                        <h3 className="font-semibold texk-bk-900 dark:text-w-100">Account Details</h3>
                        <ProfileImage/>
                        <div className="flex flex-col">
                            <label htmlFor="full-name" className='text-bk-600 dark:text-gray-400 font-medium text-sm'>Full name</label>
                            <input type="text" 
                                name="full-name" 
                                id="full-name" 
                                className='border border-bk-100 dark:border-bk-500 text-bk-800 dark:text-gray-400 p-2 rounded-md w-86'
                                disabled value={fullName} 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className='text-bk-600 dark:text-gray-400 font-medium text-sm'>Email</label>
                            <input type="email" 
                                name="email" 
                                id="email" 
                                className='border border-bk-100 dark:border-bk-500 text-bk-800 dark:text-gray-400 p-2 rounded-md w-86'
                                disabled value={email} 
                            />
                        </div>
                    </div>
                }
                {(subMenu === 'orders') && 
                    <div className="w-9/12">
                        {hasOrders && 
                            <div className="mt-15 flex flex-col ml-12">
                                {orders.map((item: OrdersByUser) => 
                                    <div className="border-b border-w-200 dark:border-bk-600 flex flex-col py-4 w-160 2xl:w-200" key={item.id}>
                                        {item.products.map((prod) =>
                                            <div className="flex justify-between">
                                                <div key={prod.title} className="flex gap-8 font-inter py-4 items-center">
                                                    <div className="flex bg-w-100 dark:bg-bk-700 h-80px px-3 justify-center">
                                                        <img className="h-62px object-cover" src={prod.image} alt={prod.title} />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-sm text-bk-900 dark:text-w-100 font-medium">{prod.title}</p>
                                                        <p className="text-xs text-bk-500 dark:text-gray-400">Ordered On: {item.date}</p>
                                                        <div className="flex gap-2">
                                                            <p className="text-xs text-bk-900 dark:text-w-100 font-medium">{FormatDolar(prod.price)}</p>
                                                            <p className="text-xs text-bk-900 dark:text-w-100">qtt.{prod.qtd}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link className="border text-sm rounded self-end px-6 my-8 py-3 font-medium border-bk-900 text-bk-900 hover:text-w-100 hover:bg-bk-900 dark:hover:bg-bk-700 dark:border-gray-400 dark:text-gray-400" 
                                                    to={`/product/${prod.id}`}>View item
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        }
                        {!hasOrders && 
                            <div className="mt-15 flex flex-col items-center justify-center gap-8 ml-12 py-30">
                                <img src={EmptyPng} alt="empty" className="dark:invert" />
                                <p className="text-bk-500 text-sm dark:text-gray-400">Your order history is waiting to be filled.</p>
                                <Btn link="/listing" text="Start Shopping" arrow/>
                            </div>
                        }
                    </div>
                }
            </div>
        </main>
    )
}