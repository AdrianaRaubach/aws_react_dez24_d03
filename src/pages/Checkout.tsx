import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { CurrentPage } from "../components/CurrentPage";
import { Link } from "react-router-dom";
import { FormatDolar } from '../utils/FormatDolar';

export const Checkout = () => {

    const cartSubtotal: number = useSelector((state:RootState) => Number(state.orderSummary.subtotal))
    const cartTotal: number = useSelector((state:RootState) => Number(state.orderSummary.total))
    const shippingTax: number = useSelector((state:RootState) => Number(state.orderSummary.tax))

    return (
        <main className="font-inter dark:bg-bk-800 pb-32">
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Checkout</h2>
                <CurrentPage actualPage="Checkout" />
            </div>
            <div className='mt-18 px-10 md:px-20 xl:px-45 flex flex-col lg:flex-row font-inter'>
                <div className='md:pr-5 lg:pr-15 xl:pr-32'>
                    <h4 className='text-bk-900 dark:text-w-100 font-semibold pb-15'>Shipping Address</h4>
                    <form>
                        <fieldset className='text-bk-600 dark:text-gray-400 text-sm font-medium flex flex-col gap-4'>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="zip-code">Zip Code</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='zip-code' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="country">Country</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='country' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="city">City</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='city' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="state">State</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='state' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="street-address">Street Address</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='street-address' />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-wrap sm:flex-nowrap w-full'>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="email">Email</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='email' />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="full-name">Full Name</label>
                                    <input className='border border-bk-100 dark:border-gray-400 rounded-sm p-3' type="text" id='full-name' />
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
                            <p className="text-bk-900 dark:text-w-100 text-sm">Free</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-bk-500 dark:text-gray-400">Tax:</p>
                            <p className="text-bk-900 dark:text-w-100 text-sm">{FormatDolar(Number(shippingTax))}</p>
                        </div>
                    </div>
                    <div className="flex justify-between font-medium my-8">
                        <p className="text-sm text-bk-900 dark:text-w-100">Total</p>
                        <p className="text-sm text-bk-900 dark:text-w-100">{FormatDolar(Number(cartTotal))}</p>
                    </div>
                    <Link to={'/checkout'} className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                        Place Order
                    </Link>
                </div>
            </div>
        </main>
    )
}
