import BgAbout from '../images/bg-about.png'
import Picture from '../images/foto.jpg'
import { RiLinkedinFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';


export const About = () => {
    return (
        <main className='dark:bg-bk-800 font-inter mt-34'>
            <div style={{ backgroundImage: `url(${BgAbout})` }} className='w-full bg-no-repeat bg-center bg-cover h-50 opacity-95'>
            </div>
                <img src={Picture} alt="my profile image" className='rounded-full w-50 border-4 border-white absolute right-20 sm:right-25 top-60' />
            <div className='px-10 md:px-20 lg:px-45 text-bk-900 dark:text-w-100 py-30 max-w-200'>
                <h1 className='font-semibold py-8 text-2xl'>Adriana Raubach</h1>
                <p className='leading-8'>Hello, I'm Adriana, a technology student studying systems analysis and development at IFRS. I am currently an intern developing front-end systems at Compass UOL.</p>
            </div>
            <div className=' flex justify-center py-5 gap-8 border border-bk-100 dark:border-bk-600 bg-w-100 dark:bg-bk-700 text-slate-500 dark:text-w-100'>
                <Link target='_blank' className='flex gap-2 items-center' to={'https://www.linkedin.com/in/adriana-raubach-443249240/'}><RiLinkedinFill />Linkedin</Link>
                <Link target='_blank' className='flex gap-2 items-center' to={'https://github.com/AdrianaRaubach'}><FaGithub />Github</Link>
            </div>
        </main>
    )
}