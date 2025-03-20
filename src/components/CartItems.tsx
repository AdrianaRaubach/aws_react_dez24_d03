import { CartProps } from "../types/PropTypes"
import { Colors } from "./Colors"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormatDolar } from '../utils/FormatDolar'
import { useDispatch } from 'react-redux';
import { removeItem , incrementQtd, decrementQtd} from "../redux/actions";
import { plusValue, minusValue, removeValue } from '../redux/actions'
import { OrderSummaryProps } from "../types/PropTypes";

export const CartItems = ({image, title, color, size, price, qtd, id}: CartProps) => {

    const dispatch = useDispatch()

    const item: CartProps = {
        id: id,
        title: title,
        image: image,
        color: color,
        size: size,
        qtd: qtd,
        price: price
    }
    const order: OrderSummaryProps = {
        price: price,
        qtd: qtd
    }

    const RemoveItem = () => {
        dispatch(removeItem(item))
        dispatch(removeValue(order))
    }

    const IncrementQtd = () => {
        dispatch(incrementQtd(item))
        dispatch(plusValue(order))
    }

    const DecrementQtd = () => {
        dispatch(decrementQtd(item))
        dispatch(minusValue(order))
    }

    return(
        <div className="flex flex-col sm:flex-row items-center text-sm w-full gap-8" >
            <div className="flex bg-w-100 dark:bg-bk-700 h-30 sm:h-80px px-4 justify-center">
                <img className="sm:h-62px object-contain sm:object-cover" src={image} alt={title} />
            </div>
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-2 items-center justify-between w-full">
                <div className="flex sm:flex-col gap-3">
                    <h5 className="font-semibold text-bk-900 dark:text-w-100" >{title}</h5>
                    <div className="flex items-center text-xs text-bk-500 dark:text-gray-300 gap-2">
                        <p>Color:</p>
                        <Colors color={color} small />
                        <p><s>--</s> Size: {size}</p>
                    </div>
                </div>
                <div className="flex items-start flex-row sm:items-center gap-4">
                    <p className="font-semibold px-3 text-bk-900 dark:text-w-100 self-center">{FormatDolar(price)}</p>
                    <div className="flex gap-4">
                        <div className="flex border rounded border-w-200 p-2.5 text-xs gap-2">
                            <button onClick={DecrementQtd} className="px-2 text-bk-500 cursor-pointer dark:text-w-100"><FaMinus /></button>
                                <p className="px-2 text-sm dark:text-w-100">{qtd}</p>
                            <button onClick={IncrementQtd} className="px-2 text-bk-500 cursor-pointer dark:text-w-100"><FaPlus /></button>
                        </div>
                        <button onClick={RemoveItem} className="bg-w-100 dark:bg-bk-700 text-bk-500 dark:text-gray-400 p-2.5 rounded text-lg cursor-pointer">
                            <IoCloseSharp />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}