type FormProps = {
    emailAddress?: string;
    fullName?: string;
    password?: string;
    confirmedPassword?: string;
    code?: string;
}

type ErrorProps = {
    errorMessage: string;
    error: boolean;
}

export const ValidateForm = ({emailAddress, fullName, password, confirmedPassword, code}: FormProps, setErrors : React.Dispatch<React.SetStateAction<ErrorProps>>) => {

    const regexFullName = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&<>#=])[A-Za-z\d@$!%*?.&<>#=]{8,}$/

    if(fullName !== undefined && fullName.length === 0) {
        console.log('entrou aqui')
        setErrors((prev) => ({...prev, error:true, errorMessage: "Enter your full name" }))
        return false
    }

    if(fullName !== undefined && !regexFullName.test(fullName)) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "The name must contain only letters and accents and the surname is mandatory" }))
        return false
    }

    if(emailAddress !== undefined && emailAddress.length === 0) {
        console.log(emailAddress)
        setErrors((prev) => ({...prev, error:true, errorMessage: "Enter your email" }))
        return false
    }
    if(emailAddress !== undefined && !regexEmail.test(emailAddress)) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "Enter a valid email" }))
        return false
    }

    if(password !== undefined && password.length === 0) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "Enter your password" }))
        return false
    }
    if(password !== undefined &&!regexPassword.test(password)) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "Password must have at least 8 alphanumeric characters, upper and lower case letters and a special character" }))
        return false
    }

    if(code !==undefined && code.length === 0) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "Enter code" }))
        return false
    }
        
    if(confirmedPassword !== undefined &&password !== confirmedPassword) {
        setErrors((prev) => ({...prev, error:true, errorMessage: "Passwords do not match" }))
        return false
    }
    return true
    
}