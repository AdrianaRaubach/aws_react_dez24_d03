import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { CurrentPage } from "../components/CurrentPage";
import { Link } from "react-router-dom";
import { FormatDolar } from '../utils/FormatDolar';
import { CartListProps, OrdersByUser } from '../types/PropTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ModalErrorSuccess, SearchModal } from '../components/ModalErrorSuccess';
import { ValidateForm } from '../utils/ValidateForm';
import api from '../service/api';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {

    const cartSubtotal: number = useSelector((state:RootState) => Number(state.orderSummary.subtotal))
    const cartTotal: number = useSelector((state:RootState) => Number(state.orderSummary.total))
    const shippingTax: number = useSelector((state:RootState) => Number(state.orderSummary.tax))
    const shipping: string = useSelector((state:RootState) => String(state.orderSummary.shipping))
    const cartProducts: CartListProps = useSelector((state:RootState) => state.cartProducts)
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [street, setStreet] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [searchMessage, setSearchMessage] = useState('')
    const [errors, setErrors] = useState({
        error: false,
        errorMessage:''
    })
    const [order, setOrder] = useState<OrdersByUser>()
    const user = useUser()
    const today: Date = new Date()
    const navigate = useNavigate()

    const formatDate = (today: Date) => {
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month:'long', day: '2-digit'}).format(today)
    }
    useEffect(() => {
        if(user.user !== null && user.user !== undefined) {
            setOrder({
                userId: user.user.id,
                date: String(formatDate(today)),
                products: cartProducts,
            })
            setEmail(String(user.user?.emailAddresses))
            setFullName(String(user.user.fullName))
        }
    },[])
    
    const HandleBlur = () =>{
        const regexZip = /^\d{8}$/
        if(!regexZip.test(zipCode)) {
            setErrors((prev) => ({...prev, error:true, errorMessage: "The zip code must contain 8 numeric characters" }))
            return
        }
        setErrors((prev) => ({...prev,errorMessage: "" }))
        setSearchMessage('Searching for address information...')
        axios.get(`https://brasilapi.com.br/api/cep/v1/${zipCode}`).then(response => {
            setCity(response.data.city)
            setState(response.data.state)
            setStreet(response.data.street)
            setSearchMessage('')
            setErrors((prev) => ({...prev, error:false, errorMessage: "Success" }))
            setTimeout(() => {
                setErrors((prev) => ({...prev, error:false, errorMessage: "" }))
            }, 2500);
        }).catch(error => {
            console.log(error.response.data.errors[0].message)
            setSearchMessage('')
            setErrors((prev) => ({...prev, error:true, errorMessage: "Zip code not found, enter the rest of the information or try later" }))
        })
    }

    const HandleSubmit = () => {
        ValidateForm({emailAddress:email, fullName:fullName, country:country}, setErrors)
        if(!ValidateForm({emailAddress:email, fullName:fullName, country:country}, setErrors)) return
        setErrors((prev) => ({...prev, error:false, errorMessage: "" }))

        api.post('/orders', order).then(response => {
           console.log("response"+response)
        })
        navigate('/after-payment')
    }
    
    return (
        <main className="font-inter dark:bg-bk-800 pb-32">
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Checkout</h2>
                <CurrentPage actualPage="Checkout" />
            </div>
            {errors.errorMessage !== '' && <div className='fixed top-80 left-10'>
                <ModalErrorSuccess onClick={()=>setErrors((prev) => ({...prev, error:false, errorMessage: "" }))} error={errors.error} message={errors.errorMessage}></ModalErrorSuccess>
                </div>
            }
            {searchMessage !== '' && <div className='fixed top-80 left-10'>
                <SearchModal onClick={()=>setSearchMessage('')} message={searchMessage}></SearchModal>
                </div>
            }
            <div className='mt-18 px-10 md:px-20 xl:px-45 flex flex-col lg:flex-row font-inter'>
                <div className='md:pr-5 lg:pr-15 xl:pr-32'>
                    <h4 className='text-bk-900 dark:text-w-100 font-semibold pb-15'>Shipping Address</h4>
                    <form>
                        <fieldset className='text-bk-600 dark:text-gray-400 text-sm font-medium flex flex-col gap-4'>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="zip-code">Zip Code</label>
                                    <input type='text' className='border border-bk-100 dark:border-gray-400 rounded-sm p-3'
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setZipCode(e.target.value)} onBlur={HandleBlur} value={zipCode} id='zip-code' 
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="country">Country</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3'
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setCountry(e.target.value)} value={country} type="text" id='country' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="city">City</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3'
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setCity(e.target.value)} value={city} type="text" id='city' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="state">State</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3'
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setState(e.target.value)} value={state} type="text" id='state' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="street-address">Street Address</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3'
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setStreet(e.target.value)} value={street} type="text" id='street-address' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="email">Email</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' 
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} value={email} type="text" id='email' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="full-name">Full Name</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' 
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> setFullName(e.target.value)} value={fullName} type="text" id='full-name' />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="pt-20 mt-20 lg:pt-5 lg:mt-0 border-t lg:border-l lg:border-t-0 border-w-200 dark:border-bk-600 pl-5 lg:pl-15 py-8 w-full flex flex-col justify-between">
                    <h5 className="font-semibold text-bk-900 dark:text-w-100">Your Order</h5>
                    <Link to="/cart" className='border text-sm rounded self-end px-6 py-3 my-15 font-medium border-bk-200 text-bk-500 hover:bg-w-100 dark:hover:bg-bk-700 dark:border-gray-400 dark:text-gray-400'>Edit Cart</Link>
                    <div className="border-b border-w-200 dark:border-bk-600 flex flex-col gap-4 pb-6 font-medium">
                        <div className="flex justify-between">
                            <p className="text-sm text-bk-500 dark:text-gray-400">Subtotal:</p>
                            <p className="text-bk-900 dark:text-w-100 text-sm">{FormatDolar(Number(cartSubtotal))}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-bk-500 dark:text-gray-400">Shipping:</p>
                            <p className="text-bk-900 dark:text-w-100 text-sm">{shipping}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-bk-500 dark:text-gray-400">Tax:</p>
                            <p className="text-bk-900 dark:text-w-100 text-sm">{FormatDolar(Number(shippingTax))}</p>
                        </div>
                    </div>
                    <div className="flex justify-between font-medium my-8">
                        <p className="text-sm text-bk-900 dark:text-w-100">Total</p>
                        <p className="text-sm text-bk-900 dark:text-w-100">{FormatDolar(Number(cartTotal) + Number(shippingTax))}</p>
                    </div>
                    <button onClick={HandleSubmit} className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                        Place Order
                    </button>
                </div>
            </div>
        </main>
    )
}
