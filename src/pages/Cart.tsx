import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { CurrentPage } from "../components/CurrentPage";
import { Link } from "react-router-dom";
import { CartItems } from "../components/CartItems";
import { CartListProps, CartProps } from '../types/PropTypes';
import { Btn } from '../components/Btn';
import { FormatDolar } from '../utils/FormatDolar';

export const Cart = () => {

    const cartProducts: CartListProps = useSelector((state:RootState) => state.cartProducts)
    const cartSubtotal: number = useSelector((state:RootState) => Number(state.orderSummary.subtotal))
    const cartTotal: number = useSelector((state:RootState) => Number(state.orderSummary.total))
    const shippingTax: number = useSelector((state:RootState) => Number(state.orderSummary.tax))
    const shipping: string = useSelector((state:RootState) => String(state.orderSummary.shipping))

    return (
        <main className="font-inter dark:bg-bk-800 pb-32">
            <div className="bg-w-100 mt-34 px-10 md:px-20 lg:px-45 pt-15 pb-5 dark:bg-bk-900">
                <h2 className="text-2xl text-bk-900 dark:text-w-100 font-bold -mb-4">Cart</h2>
                <CurrentPage actualPage="Cart" />
            </div>
            {cartProducts.length === 0 && 
                <div className='flex flex-col items-start px-10 lg:px-20 xl:px-45 py-20 gap-10'>
                    <h4 className='text-xl font-medium text-bk-900 dark:text-w-100'>Your cart is empty, click the button below to continue shopping</h4>
                    <Btn text='See Products' link='/listing' arrow/>
                </div>
            }
            {cartProducts.length > 0 && 
                <div className="px-10 lg:px-20 xl:px-45 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 xl:gap-25 mt-15">
                    <div className="w-full lg:w-9/12 xl:w-7/12">
                        <h4 className="pb-3 w-full text-bk-900 dark:text-w-100 font-semibold border-b border-w-200 dark:border-bk-600">Your cart</h4>
                        <div className="py-12 flex flex-col gap-15 sm:gap-10">
                            {cartProducts.length > 0 &&
                                <>
                                    {cartProducts.map((item: CartProps) => 
                                        <CartItems id={item.id} image={item.image} color={item.color} size={item.size} price={item.price} qtd={item.qtd} title={item.title}/>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                    <div className="border border-w-200 dark:border-bk-600 rounded px-6 py-8 w-full sm:w-8/10 lg:w-340px h-430px flex flex-col justify-between">
                        <h5 className="font-semibold text-bk-900 dark:text-w-100">Order Summary</h5>
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
                        <div className="flex justify-between font-medium">
                            <p className="text-sm text-bk-900 dark:text-w-100">Total</p>
                            <p className="text-sm text-bk-900 dark:text-w-100">{FormatDolar(Number(cartTotal) + Number(shippingTax))}</p>
                        </div>
                        <Link to={'/checkout'} className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                            {"Checkout"}
                        </Link>
                        <Link className="text-xs text-center font-medium underline cursor-pointer text-bk-900 dark:text-w-100" to="/listing">Continue Shopping</Link>
                    </div>
                </div>
            }
        </main>
    )
}
