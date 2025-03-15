import { FiAlertTriangle } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Loading } from "./Loading";



type ErrorProps = {
    message: string;
    error: boolean;
    onClick: () => void;
}
type SearchProps = {
    message: string;
    onClick: () => void;
}
export const ModalErrorSuccess = ({error, message, onClick}:ErrorProps) => {
    return (
        <div className={ error?'bg-red-100 text-red-900 text-sm font-inter py-3 px-5 rounded flex items-center gap-5 font-medium left-10 md:left-20 xl:left-45':
         'bg-green-100 text-green-900 text-sm font-inter py-3 px-5 rounded flex items-center gap-5 font-medium left-10 md:left-20 xl:left-45'}>
            {!error && <IoMdCheckmark />}
            {error && <FiAlertTriangle />}
            <p>{message}</p>
            <button onClick={onClick} className="text-gray-500 text-xl cursor-pointer hover:text-red-900"><IoCloseSharp /></button>
        </div>
    )
}
export const SearchModal = ({message, onClick}:SearchProps) => {
    return (
        <div className={ message !== '' ? 'bg-blue-100 text-blue-900 text-sm font-inter py-3 px-5 rounded flex gap-5 items-center font-medium left-10 md:left-20 xl:left-45': ''}>
            <Loading />
            {message}
            <button onClick={onClick} className="text-gray-500 text-xl cursor-pointer hover:text-red-900"><IoCloseSharp /></button>
        </div>
    )
}