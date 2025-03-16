import { Link } from 'react-router-dom'
import Logobk from '../images/icons/LogomarkBK.png'
import Github from '../images/icons/Github.png'
import Instagram from '../images/icons/Instagram.png'
import Youtube from '../images/icons/Youtube.png'
import Visa from '../images/icons/Visa.png'
import Master from '../images/icons/Mastercard.png'
import Amex from '../images/icons/Amex.png'
import { useState } from 'react'
import api from '../service/api'
import { MdErrorOutline } from "react-icons/md";
import { Loading } from './Loading'

type NewsletterProps = {
    email: string;
}

export const Footer = () => {

    const [inputEmail, setInputEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [formValidate, setFormValidate] = useState<boolean>(true)
    const [disableBtn, setDisableBtn] = useState<boolean>(false)
    const [newsletterObj, setNewsletterObj] = useState<NewsletterProps>({email:''})
    const [btnSubmit, setBtnSubmit] = useState<string>('Subscribe')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(e.target.value)
        setNewsletterObj({...newsletterObj, email: e.target.value})
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(inputEmail.length === 0) {
            setFormValidate(false)
            setError('Enter your email')
            
        } else if (!regexEmail.test(inputEmail)) {
            setFormValidate(false)
            setError('Email must be valid')
        } else {
            setBtnSubmit('Loading')
            setDisableBtn(true)
            updateEmailsNewsletter(newsletterObj)
        }
    }

    const updateEmailsNewsletter = async (newsletterEmail:NewsletterProps) => {
        
        try {
            await api.post('/newsletter', newsletterEmail)
        } catch {
            setError('Unable to register, please try again later')
            setBtnSubmit('Subscribe')
            setFormValidate(false)
        }
      }

    const getYear = (today: Date) => {
        return new Intl.DateTimeFormat('pt-BR', { year: 'numeric'}).format(today)
    }
    const year: Date = new Date()

    return(
        <footer>
            <div className="items-center font-inter flex flex-col md:flex-row justify-between py-15 px-10 md:px-20 lg:px-45 bg-w-100 dark:bg-bk-900 gap-10">
                <div className=" flex flex-col gap-7">
                    <h4 className="text-2xl font-bold text-bk-900 dark:text-w-100">Join Our Newsletter</h4>
                    <p className='text-bk-500 text-sm dark:text-gray-400 md:w-70 lg:w-100'>We love to surprise our subscribers with occasional gifts.</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit} noValidate className="flex gap-5 flex-col sm:flex-row">
                        <div>
                            <input onChange={handleInput} value={inputEmail} placeholder="Your email address" type="email" name="newsletter" className="border border-bk-100 rounded-md px-3 py-3 text-sm md:w-50 xl:w-80 bg-w-100 h-11" />
                            {!formValidate && <p className='flex items-center justify-between bg-red-200 text-red-600 text-xs px-3 pt-2 -mt-1 py-1 rounded-b-md'>{error}<MdErrorOutline className='text-lg' /></p>}
                        </div>
                        <button className='cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm h-11' disabled={disableBtn} type="submit">
                            {btnSubmit === 'Loading'? <Loading text={btnSubmit}/>: btnSubmit}</button>
                    </form>
                </div>
            </div>
            <div className='flex flex-col gap-20 md:gap-5 md:flex-row md:justify-between py-25 px-10 md:px-10 lg:px-30 xl:px-45 font-inter text-bk-500 dark:text-gray-400 bg-white dark:bg-bk-800'>
                <div className='md:w-60 flex flex-col gap-5 items-center text-center md:text-start md:items-start'>
                    <div>
                        <Link className='flex gap-4 items-center' to="/">
                            <div className='border border-bk-100 py-2 px-3 rounded-md dark:bg-blue-300'><img src={Logobk} alt="logo ecommerce" /></div>
                            <h4 className='font-bold text-black dark:text-w-100 text-xl'>Ecommerce</h4>
                        </Link>
                    </div>
                    <p className='text-sm font-light'>DevCut is a YouTube channel for practical project-based learning</p>
                    <div className='flex gap-5 mt-2'>
                        <Link to="https://github.com/" target="_blank"><img src={Github} alt="logo github" /></Link>
                        <Link to="https://www.instagram.com/" target="_blank"><img src={Instagram} alt="logo instagram" /></Link>
                        <Link to="https://www.youtube.com/" target="_blank"><img src={Youtube} alt="logo youtube" /></Link>
                    </div>
                </div>
                <div className='flex justify-evenly md:justify-between md:gap-10 xl:gap-20 2xl:gap-35'>
                    <ul className='flex flex-col gap-4 justify-between'>
                        <Link to="/"><li className='text-sm mb-3 text-bk-300 dark:text-w-100'>SUPPORT</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>FAQ</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Terms of use</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Privacy Policy</li></Link>
                    </ul>
                    <ul className='flex flex-col gap-4 justify-between'>
                        <Link to="/"><li className='text-sm mb-3 text-bk-300 dark:text-w-100'>COMPANY</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>About</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Contact</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Carees</li></Link>
                    </ul>
                    <ul className='flex flex-col gap-4 justify-between'>
                        <Link to="/"><li className='text-sm mb-3 text-bk-300 dark:text-w-100'>SHOP</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>My Account</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Checkout</li></Link>
                        <Link to="/"><li className='font-medium text-sm hover:text-gray-400 dark:hover:text-gray-500'>Cart</li></Link>
                    </ul>
                </div>
                <div className='flex flex-col items-center md:items-start gap-8'>
                    <p className='text-sm mb-3 text-bk-300 dark:text-w-100'>ACCEPTED PAYMENT</p>
                    <div className='flex justify-start gap-5'>
                        <img className='grayscale opacity-80' src={Master} alt="master logo" />
                        <img className='grayscale opacity-80' src={Amex} alt="amex logo" />
                        <img className='grayscale opacity-80' src={Visa} alt="visa logo" />
                    </div>
                </div>
            </div>
            <div className='font-inter text-bk-500 dark:text-gray-400 bg-white dark:bg-bk-800 text-sm text-center py-7 px-5 border-t border-w-200 dark:border-bk-700'>
                <p>&copy; {getYear(year)} DevCut. All rights reserved.</p>
            </div>
        </footer>
    )
}