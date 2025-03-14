export type StarRating = {
    [key: number]: number;
}

export type ColorStock = {
    qtd: number;
    color: string;
    image: string;
}

export type SizeStock = {
    size: string;
    colors: ColorStock[];
}

export type ProductsProps = {
    id: string;
    category: string;
    title: string;
    onOffer: boolean;
    totalSold: number;
    price: number;
    detail: string;
    stars: StarRating[];
    stok: SizeStock[];
}

export type CartProps = {
    id: string;
    title: string;
    image: string;
    color: string;
    size: string;
    qtd: number;
    price: number;
}

export type CartListProps = CartProps[]