import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

type BtnProps= {
    link: string;
    text: string;
    arrow?: boolean;
}
export const Btn = ({text, link, arrow}:BtnProps) => {

    return (
        <Link to={link} className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>{text}
            {arrow &&  <FaArrowRight />}
        </Link>
    )
}