import { Link, NavLink } from "react-router-dom"
import Logo from '../images/icons/Logomark.svg'
import CartIcon from '../images/icons/cart.png'
import UserIcon from '../images/icons/User.png'
import api from '../service/api'
import { useState, useEffect } from "react"

type OffersProps = {
    offer : {
        id: string;
        offer: string;
    }
}

export const Header = () => {

    const [offers, setOffers] = useState<OffersProps[]>([])
    const [offerActive, setOfferActive] = useState<string>('')

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
        <header className="fixed top-0 w-full border-b border-w-100 dark:border-bk-800 z-100">
            <div className="flex h-18 sm:h-11 p-3 font-inter text-sm pr-20 sm:px-0 text-white bg-bk-900 dark:bg-blue-300 dark:text-bk-900 items-center justify-center font-light w-full">
                <p>{offerActive}<Link to="/" className="cursor-pointer font-medium"> Order Now</Link></p>
            </div>
            <nav className="flex justify-between px-10 md:px-20 lg:px-45 py-7 bg-white dark:bg-bk-900">
                <div className="flex items-center gap-15 lg:gap-30">
                    <Link to="/">
                        <div className="flex items-center gap-3">
                            <div className="flex bg-bk-900 dark:bg-blue-400 rounded-full w-10 h-10 items-center justify-center">
                                <img src={Logo} alt="ecommerce-logo" />
                            </div>
                            <h2 className="font-bold text-xl dark:text-white">Ecommerce</h2>
                        </div>
                    </Link>
                    <ul className="font-inter text-sm font-medium flex gap-10">
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
                    <Link to="/cart"><img src={CartIcon} alt="cart" /></Link>
                    <Link to="/profile"><img src={UserIcon} alt="profile" /></Link>
                </div>
            </nav>
        </header>
    )
}