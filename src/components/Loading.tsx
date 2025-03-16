import { ImSpinner2 } from "react-icons/im";
type SpinProps = {
    text?: string;
}

export const Loading = ({text}:SpinProps) =>{

    return(
        <div className="flex text-md gap-2 items-center">
            <p>{text}</p>
            <div className="animate-spin">
                <ImSpinner2 />
            </div>
        </div>
    )
}