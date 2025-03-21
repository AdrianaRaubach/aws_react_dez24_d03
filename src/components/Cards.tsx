import { FormatDolar } from '../utils/FormatDolar'
import { Link } from 'react-router-dom'
import { StokLabel } from './StokLabel'
type CardProps = {
    title: string;
    price: number;
    image: string;
    routeId: string;
    inStok: boolean;
}

export const Cards = ({title, price, image, inStok, routeId } : CardProps) => {

    return (
        <Link to={`/product/${routeId}`} className="text-bk-900 dark:text-bk-100 font-inter text-sm flex flex-col gap-3">
            <div className="w-240px h-312px bg-w-100 dark:bg-bk-700 mb-3 flex items-center">
                <img className="w-full" src={image} alt={title} />
            </div>
            <h4 className="font-semibold">{title}</h4>
            <div className="flex font-inter items-center gap-4 pb-10">
                <StokLabel inStok={inStok} />
                <p className="text-bk-600 dark:text-gray-400">{FormatDolar(price)}</p>
            </div>
        </Link>
    )
}