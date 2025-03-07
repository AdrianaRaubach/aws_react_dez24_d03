import ImageBanner from '../images/products/banner.png'
import ImageBanner2 from '../images/products/banner-2.png'
import Star from '../images/icons/Burst-pucker.svg'
import { Advantages } from '../components/Advantages';
import Truck from '../images/icons/truck.png'
import Quality from '../images/icons/quality.png'
import Secure from '../images/icons/secure.png'
import { Cards } from '../components/Cards'
import image from '../images/products/cover-1.png'
// import api from '../service/api'
// import { useState, useEffect } from 'react'
import { Btn } from '../components/Btn'

export const Homepage = () => {
  
    // const [products, setProducts] = useState([])
  
    // useEffect(() => {
    //     api.get('/products').then(response => {
    //       setProducts(response.data)
    //     })
    // },[])
  
    return (
      <main className='dark:bg-bk-800 font-inter'>
        <div className='mt-34 px-10 md:px-20 lg:px-45 flex flex-col sm:flex-row justify-between font-inter overflow-hidden bg-w-100 dark:bg-bk-900 '>
          <div className='flex items-start flex-col justify-center gap-4 pt-20 sm:pt-10'>
            <h1 className='text-3xl font-semibold text-bk-000 dark:text-w-200'>Fresh Arrivals Online</h1>
            <p className='text-bk-600 dark:text-gray-400 text-sm mb-10'>Discover Our Newest Collection Today.</p>
            <Btn text='View Collection' link='/products' arrow />
          </div>
          <div className='flex self-center'>
            <div className='bg-w-200 rounded-full w-85 h-85 mt-20'>
              <img src={Star} />
              <div className='flex justify-end -mt-17'>
                <img src={ImageBanner} className='h-93' alt="man wearing white t-shirt with simple print" />
              </div>
          </div>
          </div>
        </div>
        <div className='my-30 px-10 md:px-20 lg:px-45 flex flex-col md:flex-row gap-10 lg:gap-25 items-center md:items-start'>
          <Advantages icon={Truck} text="Upgrade your style today and get FREE shipping on all orders! Don't miss out." title='Free Shipping' alt='truck icon' />
          <Advantages icon={Quality} text='Shop confidently with our Satisfaction Guarantee: Love it or get a refund.' title='Satisfaction Guarantee' alt='quality icon' />
          <Advantages icon={Secure} text='Your security is our priority. Your payments are secure with us.' title='Secure Payment' alt='secure icon' />
        </div>
        <div className='my-10 mt-40 px-10 md:px-20 lg:px-45'>
          <div className='flex flex-col items-center gap-3 my-30'>
            <p className='text-bk-300 dark:text-gray-400 text-xs w-32.5'>SHOP NOW</p>
            <h2 className='text-2xl font-bold text-black dark:text-w-100'>Best Selling</h2>
          </div>
          <div className='flex justify-center gap-5 sm:justify-between flex-wrap'>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
          </div>
        </div>
        <div className='mt-34 px-10 md:px-20 pb-5 lg:px-45 pt-20 flex flex-col sm:flex-row justify-between bg-w-100 dark:bg-bk-900 overflow-hidden'>
            <div className='flex flex-col items-start gap-7'>
              <h3 className='text-2xl font-bold text-bk-900 dark:text-w-100'>Browse Our Fashion Paradise!</h3>
              <p className='text-bk-500 text-sm dark:text-gray-400 md:w-90 lg:w-110'>Step into a world of style and explore our diverse collection of clothing categories.</p>
              <Btn text='Start Browsing' link='/products' arrow/>
            </div>
            <div className='flex justify-center'>
              <img className='h-80 object-cover mt-5 sm:-mt-20 grow-0' src={ImageBanner2} alt="image banner" />
            </div>
        </div>
        <div className='mt-40 pb-40 px-10 md:px-20 lg:px-45 flex flex-col gap-18'>
          <p className="self-center border border-bk-100 dark:text-w-100 py-1.5 px-4 font-medium rounded-2xl text-sm">On Offer</p>
          <div className='flex justify-center gap-5 sm:justify-between flex-wrap'>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
            <Cards price={334} inStock={true} image={image} title='camiseta confortável'></Cards>
          </div>
        </div>
      </main>
    )
}

