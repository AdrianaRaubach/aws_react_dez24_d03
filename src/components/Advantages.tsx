type AdvantageProps = {
    icon: string;
    title: string;
    text: string;
    alt: string;

}
export const Advantages = ({icon, title, text, alt}: AdvantageProps) => {
    return (
        <div className="flex items-center text-center md:text-start md:items-start flex-col font-inter gap-5 w-70">
            <div className="bg-w-100 rounded-full p-3.5 w-12 h-12 flex justify-center">
                <img src={icon} alt={alt} />
            </div>
            <h4 className="font-semibold text-bk-800 dark:text-w-200">{title}</h4>
            <p className="text-sm text-bk-500 dark:text-gray-400">{text}</p>
        </div>
    )
}