import { RootState } from '../redux/reducers';
import { Link, NavLink } from "react-router-dom"
import Logo from '../images/icons/Logomark.svg'
import CartIcon from '../images/icons/cart.png'
import UserIcon from '../images/icons/User.png'
import api from '../service/api'
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { useAuth } from "@clerk/clerk-react";
import { ProfileImage } from './ProfileImage';
import Menu from '../images/icons/Menu.svg'


type OffersProps = {
    offer : {
        id: string;
        offer: string;
    }
}

export const Header = () => {
    const user = useAuth()
    const cartProducts = useSelector((state: RootState) => state.cartProducts.length)
    const [offers, setOffers] = useState<OffersProps[]>([])
    const [offerActive, setOfferActive] = useState<string>('')
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        api.get('/offers').then(response => {
            setOffers(response.data)
        })
    },[])

    useEffect(() => {
        let i = 0        
        const interval = setInterval(() => {
            const actualOffer = String(offers[i].offer)
            setOfferActive(actualOffer)
            i++
            if(i === offers.length) i = 0

        }, 3500);
    
        return () => clearInterval(interval)
    }, [offers]);


    return (
        <header className="fixed top-0 w-full dark:border-bk-800 z-100">
            <div className="flex h-18 sm:h-11 p-3 font-inter text-sm pr-20 sm:px-0 text-white bg-bk-900 dark:bg-blue-300 dark:text-bk-900 items-center justify-center font-light w-full">
                <p>{offerActive}<Link to="/listing" className="cursor-pointer font-medium"> Order Now</Link></p>
            </div>
            <nav className="flex justify-between px-10 md:px-20 lg:px-45 bg-white dark:bg-bk-900">
                <div className="flex h-24 items-center gap-2 sm:gap-15 lg:gap-30">
                    <Link to="/">
                        <div className="flex items-center gap-3">
                            <div className="flex bg-bk-900 dark:bg-blue-400 rounded-full w-10 h-10 items-center justify-center">
                                <img src={Logo} alt="ecommerce-logo" />
                            </div>
                            <h2 className="font-bold text-xl dark:text-white">Ecommerce</h2>
                        </div>
                    </Link>
                    <ul className="font-inter text-sm font-medium hidden sm:flex gap-10">
                        <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white' : 'text-bk-500 dark:text-gray-400')}
                            >
                            Home
                            </NavLink>
                        </li>
                        <li>
                        <NavLink
                            to="/listing"
                            className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white' : 'text-bk-500 dark:text-gray-400')}
                            >
                            Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white' : 'text-bk-500 dark:text-gray-400')}
                            >
                            About
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-8 items-center">
                    <div className="relative">
                        <Link to="/cart"><img src={CartIcon} className='dark:invert' alt="cart" /></Link>
                        {cartProducts> 0 && <div className="absolute bg-red rounded-full text-w-100 text-xs w-4 h-4 text-center font-semibold top-3 left-3">{cartProducts}</div>}
                    </div>
                    <button className='block sm:hidden cursor-pointer' onClick={() => setShowMenu(!showMenu)}>
                        <img className='dark:invert w-8' src={Menu} alt="menu" />
                    </button>
                    {!user.isSignedIn && <Link to="/login"><img src={UserIcon} className='dark:invert hidden sm:block' alt="profile" /></Link>}
                    {user.isSignedIn && <Link className='hidden sm:block' to="/profile"><ProfileImage/></Link>}
                </div>
            </nav>
                <div className={showMenu? 'block': 'hidden'}>
                    <div className='absolute top-42 right-15 py-10 px-15 bg-bk-100 border border-bk-200 dark:bg-bk-700 dark:border-bk-900  rounded-md'>
                        <ul className="font-inter text-sm font-medium gap-10 flex flex-col">
                            <li className='border-b border-bk-200'>
                                <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white pr-10 pb-2' : 'text-bk-500 dark:text-gray-400 pr-10 pb-2')}
                                >
                                Home
                                </NavLink>
                            </li>
                            <li className='border-b border-bk-200'>
                                <NavLink
                                to="/listing"
                                className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white pr-10 pb-2' : 'text-bk-500 dark:text-gray-400 pr-10 pb-2')}
                                >
                                Shop
                                </NavLink>
                            </li>
                            <li className='border-b border-bk-200'>
                                <NavLink
                                to="/about"
                                className={({ isActive }) => (isActive ? 'text-bk-700 dark:text-white pr-10 pb-2' : 'text-bk-500 dark:text-gray-400 pr-10 pb-2')}
                                >
                                About
                                </NavLink>
                            </li>
                            <li className='pl-5'>
                                {!user.isSignedIn && <Link to="/login"><img src={UserIcon} className='dark:invert sm:block' alt="profile" /></Link>}
                                {user.isSignedIn && <Link className='sm:block' to="/profile"><ProfileImage/></Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            
        </header>
    )
}