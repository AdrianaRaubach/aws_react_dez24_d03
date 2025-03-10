import { WiSolarEclipse } from "react-icons/wi";
import { BsFillMoonStarsFill } from "react-icons/bs";



export const ToggleTheme = () => {

    const html = document.querySelector('html')

    const handleClick = () => {
        html?.classList.toggle('dark')
    }
    return (
        <div className="end-3 sm:end-10 fixed top-5 sm:top-2 z-100">
            <button onClick={handleClick} className="shadow-md hover:shadow-2xs hover:opacity-97 cursor-pointer bg-blue-300 dark:bg-bk-900 flex w-15 h-7 rounded-2xl items-center justify-between border-2 border-blue-300 dark:border-bk-900"> 
                <WiSolarEclipse className="text-4xl p-1 text-amber-600 dark:text-bk-900" />
                <BsFillMoonStarsFill className=" mr-1 px-1 text-2xl text-blue-300 dark:text-blue-300" />
            </button>
        </div>
    )
}