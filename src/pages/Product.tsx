import api from '../service/api'
import { useEffect, useState } from 'react'
import { CurrentPage } from '../components/CurrentPage'
import { ProductsProps } from '../types/PropTypes'
import { Btn } from '../components/Btn'
import { FormatDolar } from '../utils/FormatDolar'
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Cards } from '../components/Cards';
import { LuShare2 } from "react-icons/lu";
import { IoIosCopy } from "react-icons/io";
import { Colors } from '../components/Colors'



export const Product = () => {
    
    const currentUrl = location.href
    const productId = `${location.pathname.split('/')[2]}`
    const [product, setProduct] = useState<ProductsProps | null>(null);
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [qtdAdd, setQtdAdd] = useState<number>(1)
    const [seeDetail, setSeeDetail] = useState<boolean>(true)
    const [copyLink, setCopyLink] = useState<boolean>(false)
    const [hasStok, setHasStok] = useState<boolean>(true)
    const [colorChecked, setColorChecked] = useState<string>('')
    const [sizeChecked, setSizeChecked] = useState<string>('')
    
    useEffect(() => {
        api.get(`/products/${productId}`).then(response => {
            setProduct(response.data)
        })
    },[productId])

    useEffect(() => {
        api.get(`/products`).then(response => {
            setProducts(response.data)
        })
    },[])

    const filterSimilarProducts = products.filter((item) => item.category === product?.category).slice(0, 4)

    const QtdAddPlus = () => {
        setQtdAdd(qtdAdd+1)
    }
    const QtdAddMinus = () => {
        if (qtdAdd === 1) return
        setQtdAdd(qtdAdd-1)
    }
    const ShareLink = () => {
        navigator.clipboard.writeText(currentUrl)
        setCopyLink(true)
        setTimeout(() => {
            setCopyLink(false)
        }, 1500);
    }

    const ColorSelect = ( e: React.ChangeEvent<HTMLInputElement>) => {
        if(colorChecked === e.target.name) {
            setColorChecked('')
            return
        }
        setColorChecked(e.target.name) 
    }
    
    const SizeSelect = ( e: React.ChangeEvent<HTMLInputElement>) => {
        if(sizeChecked === e.target.name) {
            setSizeChecked('')
            return
        }
        setSizeChecked(e.target.name)
    }

    if (!product) {
        return <div>Loading...</div>
    }
    const colorList = [...new Set(product.stok.flatMap((item) => item.colors.map((colorItem) => colorItem.color)))]

    return (
        <main className='mt-34 px-10 md:px-20 lg:px-45 font-inter dark:bg-bk-800'>
            <div className='border-t border-w-100 dark:border-bk-700 mt-45 sm:mt-35'><CurrentPage actualPage={product.title}/></div>
            <div className='flex flex-col md:flex-row md:justify-between gap-20 md:gap-10 xl:gap-30'>
                <div className=' bg-w-100 flex items-center justify-center py-5 lg:px-12 xl:px-21 dark:bg-bk-700'>
                    <img className='w-360px' src={product.stok[0].colors[0].image} alt={product.title} />
                </div>
                <div className='flex flex-col gap-3 justify-center'>
                    <h2 className='text-2xl font-bold text-bk-900 dark:text-w-100'>{product.title}</h2>
                    <div className='flex gap-3'>
                        <p className="flex items-center gap-2 bg-w-100 text-bk-500 py-1.5 px-4 rounded-2xl text-xs dark:bg-bk-700 dark:text-gray-400">
                            <span className='text-lg'><FaStar /></span>
                            stars and reviews
                        </p>
                        <p className="border border-bk-100 py-1.5 px-4 rounded-2xl text-xs dark:text-w-100">IN STOCK</p>
                    </div>
                    <p className='text-lg font-semibold text-bk-900 py-3 dark:text-w-100'>{FormatDolar(product.price)}</p>
                    {hasStok && 
                        <div className='flex flex-col gap-5'>
                            <div>
                                <p className='text-xs text-bk-500 pb-4 dark:text-gray-400'>AVAIBLE COLORS</p>
                                <div className='flex gap-3'>
                                    {colorList.map((color) => 
                                        <label key={color}>
                                            <input type="checkbox" className='hidden peer' name={color} checked={colorChecked === color} onChange={(e) => ColorSelect(e)} />
                                            <div className="hover:opacity-80 peer-checked:border cursor-pointer rounded-full border-bk-700 dark:border-gray-400 p-1 w-7.5 h-7.5 items-center">
                                                <Colors color={color}/>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className='text-xs text-bk-500 pb-4 dark:text-gray-400'>SELECT SIZE</p>
                                <div className='flex gap-2'>
                                    {product.stok.map((item) => 
                                        <label key={item.size}>
                                            <input type="checkbox" className='hidden peer' name={item.size} checked={sizeChecked === item.size} onChange={(e) => SizeSelect(e)} />
                                            <div className='cursor-pointer hover:bg-w-200 dark:border-bk-700 dark:hover:bg-bk-700 py-3 text-xs peer-checked:border-bk-900 dark:peer-checked:border-w-100 dark:peer-checked:text-w-100 peer-checked:text-bk-900 text-bk-500 border rounded-md border-bk-100 w-10 h-10 text-center'>
                                                {item.size}
                                            </div>
                                        </label>  
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className='text-xs text-bk-500 pb-4 dark:text-gray-400'>QUANTITY</p>
                                <div className="flex border rounded border-w-200 p-2.5 text-xs gap-2">
                                    <button className="px-3 text-bk-500 cursor-pointer dark:text-w-100" onClick={QtdAddMinus}><FaMinus /></button>
                                    <p className="px-4 dark:text-w-100">{qtdAdd}</p>
                                    <button className="px-3 text-bk-500 cursor-pointer dark:text-w-100" onClick={QtdAddPlus}><FaPlus /></button>
                                </div>
                            </div>
                            <Btn text='Add to cart' link='/'/>
                            <p className='text-xs text-bk-500 dark:text-gray-400'>— FREE SHIPPING ON ORDERS $100+</p>
                        </div>
                    }
                </div>
                <div>
                    <button onClick={ShareLink} className='text-2xl relative text-bk-500 self-start cursor-pointer'><LuShare2 />
                        {copyLink && <p className='absolute border p-1.5 flex gap-2 items-center text-center border-w-200 dark:border-bk-600 rounded text-sm text-bk-500 dark:text-gray-400'>
                                    <IoIosCopy />
                                    Copied
                                </p>}
                    </button>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row mt-10 md:mt-40 gap-10 sm:items-center'>
                <button onClick={() => setSeeDetail(!seeDetail)} className='cursor-pointer rounded-lg px-6 flex bg-w-100 text-sm font-medium py-2.5 gap-3 w-240px h-10 dark:bg-bk-700 dark:text-w-100'><span className='leading-2 text-2xl'>...</span><p>Details</p></button>
                {seeDetail &&
                    <div className='flex flex-col gap-5 sm:w-3xl'>
                        <h6 className='font-medium text-bk-900 dark:text-w-100'>Detail</h6>
                        <p className='text-sm text-bk-500 dark:text-gray-300'>{product.detail}</p>
                    </div>
                }
            </div> 
            <div className='flex flex-col gap-20 pb-30 mt-30 md:mt-80'>
                <div>
                    <h6 className='text-2xl font-bold dark:text-w-100 pb-2'>You might also like</h6>
                    <p className='text-bk-500 dark:text-gray-400 text-xs'>SIMILAR PRODUCTS</p>
                </div>
                    {filterSimilarProducts.length > 0 &&
                        <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
                            {filterSimilarProducts.map(item => 
                                <Cards key={item.id} routeId={item.id} title={item.title} price={item.price} image={item.stok[0].colors[0].image} inStock />
                            )}
                        </div>
                    }
            </div>
        </main>
    )
}