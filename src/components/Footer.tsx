export const Footer = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)
    }

    return(
        <footer>
            <div className="items-center font-inter flex flex-col md:flex-row justify-between py-15 px-10 md:px-20 lg:px-45 bg-w-100 dark:bg-bk-900 gap-10">
                <div className=" flex flex-col gap-7">
                    <h4 className="text-2xl font-bold text-bk-900 dark:text-w-100">Join Our Newsletter</h4>
                    <p className='text-bk-500 text-sm dark:text-gray-400 md:w-70 lg:w-100'>We love to surprise our subscribers with occasional gifts.</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit} noValidate className="flex gap-5 flex-col sm:flex-row">
                        <input placeholder="Your email address" type="email" name="newsletter" className="border border-bk-100 rounded-md px-3 py-3 text-sm md:w-50 xl:w-80 bg-w-100" />
                        <input className='cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm' type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
            <div>

            </div>
        </footer>
    )
}