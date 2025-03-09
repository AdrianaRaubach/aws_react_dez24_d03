import { IoClose } from "react-icons/io5";

type FilterProps = {
    filter: string;
}
export const Filters = ({filter}: FilterProps) => {
    return (
        <div className="flex border border-bk-100 py-2 px-4 font-medium rounded-2xl text-xs dark:text-w-100">{filter}<button><IoClose /></button></div>
    )
} 