import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
type PageProps = {
    actualPage : string;
}

export const CurrentPage = ({ actualPage }: PageProps) => {

    return (

        <div className="text-bk-500 font-inter text-sm flex items-center gap-3 py-7 dark:text-gray-400 ">
            <Link className="hover:text-gray-400 dark:hover:text-gray-500" to="/">Ecommerce</Link>
            <MdOutlineArrowForwardIos />
            <p className="text-bk-900 font-medium dark:text-w-100">{actualPage}</p>
        </div>
    )
}