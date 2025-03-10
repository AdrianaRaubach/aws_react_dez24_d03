import { IoClose } from "react-icons/io5";

type FilterProps = {
    filter: string;
    onClick: () => void;
}
export const Filters = ({filter, onClick}: FilterProps) => {
    return (
        <div className="flex items-center border border-bk-100 py-2 px-4 font-medium rounded-2xl text-xs text-bk-900 dark:text-w-100">
            {filter}
            <button onClick={onClick} className="text-xl text-bk-500 dark:text-gray-400 hover:text-red-600 cursor-pointer">
                <IoClose />
            </button>
        </div>
    )
} 