import ConfirmedBox from '../images/icons/confirmed.svg'
import { CurrentPage } from '../components/CurrentPage'
import { Btn } from '../components/Btn'
export const AfterPayment = () => {
    return(
        <main className='font-inter dark:bg-bk-800'>
            <div className='mt-34 pt-15 pb-7 px-10 md:px-20 lg:px-45 bg-green-100 dark:bg-green-800'>
                <h2 className='text-2xl font-bold -mb-4 text-bk-900 dark:text-w-100'>Successful Order</h2>
                <CurrentPage actualPage='Successful Order'/>
            </div>
            <div className='flex flex-col items-center py-40 text-center gap-5'>
                <img className='mb-5 dark:filter dark:invert-[0.75]' src={ConfirmedBox} alt="confimed payment" />
                <h4 className='text-2xl font-bold text-bk-900 dark:text-w-100'>Thank you for shopping</h4>
                <p className='w-80 sm:w-96 mb-8 text-bk-500 dark:text-gray-400 text-sm'>Your order has been successfully placed and is now being processed.</p>
                <Btn arrow text='Go to my account' link='/profile'/>
            </div>
        </main>
    )
}