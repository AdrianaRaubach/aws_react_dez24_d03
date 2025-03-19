import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export const ProfileImage = () => {

    const user = useUser()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const initials = firstName[0] + lastName[0]

    useEffect(()=> {
        setFirstName(String(user.user?.firstName))
        setLastName(String(user.user?.lastName))
    }, [])
   

    return (
        <div className="text-sm rounded-full w-12 h-12 bg-primary-b-100 text-primary-b-900 dark:bg-blue-300 text-center dark:text-blue-950 p-3.5">
            {String(initials).toUpperCase()}
        </div>
    )
}