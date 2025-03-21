type ColorProp = {
    color: string;
    small?: boolean;
}

const colorMap: { [key: string]: string } = {
    red: 'bg-red',
    blue: 'bg-blue',
    green: 'bg-green',
    yellow: 'bg-yellow',
    black: 'bg-black',
    clear: 'bg-clear',
    navy: 'bg-navy',
    brown: 'bg-brown',
    beige: 'bg-beige',
    silver: 'bg-silver',
    white: 'bg-w-100',
    gray: 'bg-slate-500'
};

export const Colors = ({ color, small }: ColorProp) => {
    const bgColorClass = colorMap[color]

    return (
        
        <div className={`${bgColorClass} ${small? "w-3 h-3":"w-5 h-5"} rounded-full`}></div>
        
    );
};