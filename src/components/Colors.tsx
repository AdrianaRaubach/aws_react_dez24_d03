type ColorProp = {
    color: string;
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
};

export const Colors = ({ color }: ColorProp) => {
    const bgColorClass = colorMap[color]

    return (
        
        <div className={`${bgColorClass} w-5 h-5 rounded-full`}></div>
        
    );
};