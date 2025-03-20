import TshirtImage from '../images/icons/t-shirt-error.png'
import { motion } from "motion/react"
import { Btn } from '../components/Btn'
export const Page403 =() => {

    return (
        <main className='dark:bg-bk-800 font-inter h-230 xl:h-280'>
            <div className='relative'>
                <motion.div
                    initial={{ x: -500, y: 0 }} 
                    animate={{ x: 0, y:0  }}
                    transition={{
                        duration: 1,
                        ease: 'easeIn', 
                        
                    }}
                    >
                    <img className=' w-90 sm:w-120 lg:w-150 xl:w-200 pt-30 sm:pt-20' src={TshirtImage} alt="t-shirt" />
                    <h2 className='absolute top-80 lg:top-100 xl:top-120 left-32 sm:left-40 lg:left-52 xl:left-65 text-3xl sm:text-5xl xl:text-7xl font-bold text-w-100'>
                        ERROR <br/>
                        <span className=' text-5xl sm:text-7xl xl:text-9xl'>403</span>
                    </h2>
                </motion.div>
                <motion.p
                    className='text-6xl lg:text-8xl xl:text-9xl left-15 sm:left-100 lg:left-130 xl:left-170 font-bold absolute sm:top-80 xl:top-110 animate-pulse text-bk-900 dark:text-w-100'
                    initial={{ x: -500, y: 0 }} 
                    animate={{ x: 0, y:0  }}
                    transition={{
                        duration: 1,
                        ease: 'easeIn', 
                        
                    }}
                    >
                        ACCESS<br/> DENIED
                        <Btn link='/'arrow text='Login'/>
                </motion.p>
            </div>
        </main>
    )
}