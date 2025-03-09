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
    price: number;
    detail: string;
    stars: StarRating[];
    stok: SizeStock[];
}