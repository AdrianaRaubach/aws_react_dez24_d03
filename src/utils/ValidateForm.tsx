type FormProps = {
    email?: string;
    fullName?: string;

}

export const ValidateForm = ({email, fullName}: FormProps) => {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexName = /^[a-záàâãéèêíïóôõöúçñ\s]+$/i

    console.log(regexEmail.test(email))
    console.log(regexName.test(fullName))
}