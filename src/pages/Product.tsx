import api from '../service/api'
import { useEffect, useState } from 'react'
import { CurrentPage } from '../components/CurrentPage'
import { CartProps, ProductsProps } from '../types/PropTypes'
import { FormatDolar } from '../utils/FormatDolar'
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Cards } from '../components/Cards';
import { LuShare2 } from "react-icons/lu";
import { IoIosCopy } from "react-icons/io";
import { Colors } from '../components/Colors'
import { StokLabel } from '../components/StokLabel'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/actions';
import { addValue } from '../redux/actions'
import { OrderSummaryProps } from '../types/PropTypes'
import { ModalErrorSuccess } from '../components/ModalErrorSuccess';

export const Product = () => {
    
    const currentUrl = location.href
    const productId = `${location.pathname.split('/')[2]}`
    const [product, setProduct] = useState<ProductsProps | null>(null);
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [qtdAdd, setQtdAdd] = useState<number>(1)
    const [seeDetail, setSeeDetail] = useState<boolean>(true)
    const [copyLink, setCopyLink] = useState<boolean>(false)
    const [colorChecked, setColorChecked] = useState<string>('')
    const [sizeChecked, setSizeChecked] = useState<string>('')
    const [indexImage, setIndexImage] = useState<number>(0)
    const [errorAddItem, setErrorAddItem] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [colorList, setColorList] = useState<Array<string>>([])
    const [availableSize, setAvailableSize] = useState<Array<string>>([])
    const [loadPage, setLoadPage] = useState<boolean>(false)

    const dispatch = useDispatch()
      
    useEffect(() => {
        api.get(`/products/${productId}`).then(response => {
            setProduct(response.data)
        })
        setLoadPage(true)
    },[productId])

    useEffect(() => {
        api.get('/products?_start=0&_end=4', {
            params: {
                category: product?.category
            }
        }).then(response => {
            setProducts(response.data)
        })
    },[product])

    useEffect(() => {
        if(product !== null) {
            const colors = [...new Set(product.stok.flatMap((item) => item.colors.map((colorItem) => colorItem.color)))]
            setColorList(colors)
            const size = product.stok.map((item) => item.size)
            setAvailableSize(size)
        }
    },[product])

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

    const ColorSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(colorChecked === e.target.name) {
            setColorChecked('')
            return
        }
        setColorChecked(e.target.name) 
    }
    
    const SizeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(sizeChecked === e.target.name) {
            setSizeChecked('')
            return
        }
        setSizeChecked(e.target.name)
    }
    
    useEffect(() => {
        if(product !== null && sizeChecked !== '' && loadPage === true) {
            setColorList(product.stok.filter((item) => item.size === sizeChecked).flatMap((item) =>
                item.colors.filter((colorItem) => colorItem.qtd > 0).map((colorItem) => colorItem.color)))
        }
        if(sizeChecked === '' && product != null) {
            const colors = [...new Set(product.stok.flatMap((item) => item.colors.map((colorItem) => colorItem.color)))]
            setColorList(colors)
        }
    }, [sizeChecked])

    useEffect(() => {
        if(product !== null && colorChecked !== '' && loadPage === true) {
            setAvailableSize(product.stok
                .filter((item) => 
                    item.colors.some((colorItem) => colorItem.color === colorChecked && colorItem.qtd > 0)
                ).map((item) => item.size))
        }
        if(colorChecked === '' && product != null) {
            const size = product.stok.map((item) => item.size)
            setAvailableSize(size)
        }
    },[colorChecked])

    if (!product) {
        return <div>Loading...</div>
    }

    const imagesList = [...new Set(product.stok.flatMap((item) => item.colors.map((colorItem) => colorItem.image)))]

    const stokTotal = (product.stok.map((item) => 
        item.colors.map((colorQtd) => colorQtd.qtd))).flat().reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    )
    
    const HandleAdd = () => {

        if( colorChecked === '' || sizeChecked === '') {
            setErrorAddItem(true)
            setMessageError('Size and color are required')
            return
        }
        const item: CartProps = {
            id: product.id,
            title: product.title,
            image: product.stok[0].colors[0].image,
            color: colorChecked,
            size: sizeChecked,
            qtd: qtdAdd,
            price: product.price
        }
        dispatch(addItem(item))
        setErrorAddItem(false)
        setMessageError('Item added to cart')

        const order: OrderSummaryProps = {
            price: product.price,
            qtd: qtdAdd
        }
        dispatch(addValue(order))
    }

    return (
        <main className='mt-34 px-10 md:px-20 lg:px-45 font-inter dark:bg-bk-800'>
            {messageError !== '' && <div className='fixed right-10'> 
                    <ModalErrorSuccess error={errorAddItem} message={messageError} onClick={() => setMessageError('')}/>
                </div>
            }
            <div className='border-t border-w-100 dark:border-bk-700 mt-42 sm:mt-35'><CurrentPage actualPage={product.title}/></div>
            <div className='flex flex-col md:flex-row md:justify-between gap-20 md:gap-10 xl:gap-30'>
                <div className=' bg-w-100 flex flex-col items-center justify-center py-5 lg:px-12 xl:px-21 dark:bg-bk-700 relative'>
                    <img className='w-360px' src={imagesList[indexImage]} alt={product.title} />
                    <div className='flex gap-3 absolute bottom-6'>
                        {imagesList.slice(0,4).map((image, index) => 
                                            <button onClick={()=> setIndexImage(index)} className={`w-8px h-8px bg-bk-200 hover:bg-bk-300 rounded-full ${index===indexImage? 'bg-bk-900':''}`}/>
                                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 my-4'>
                    <h2 className='text-2xl font-bold text-bk-900 dark:text-w-100'>{product.title}</h2>
                    <div className='flex gap-3'>
                        <div className="flex items-center gap-2 bg-w-100 text-bk-500 py-1.5 px-4 rounded-2xl text-xs dark:bg-bk-700 dark:text-gray-400">
                            <span className='text-lg'><FaStar /></span>
                            {product.averageStars}<hr className='w-3 text-bk-500' />{product.totalReviews} Reviews
                        </div>
                        <StokLabel inStok={stokTotal>0} />
                    </div>
                    <p className='text-lg font-semibold text-bk-900 py-3 dark:text-w-100'>{FormatDolar(product.price)}</p>
                    {stokTotal > 0 && 
                        <div className='flex flex-col gap-5'>
                            <div>
                                <p className='text-xs text-bk-500 pb-4 dark:text-gray-400'>AVAIBLE COLORS</p>
                                <div className='flex gap-3'>
                                    {colorList.map((color:string) =>
                                        <label key={color}>
                                            <input type="checkbox" className='hidden peer' name={(color)} checked={colorChecked === color} onChange={(e) => ColorSelect(e)} />
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
                                    {availableSize.map((size:string) => 
                                        <label key={size}>
                                            <input type="checkbox" className='hidden peer' name={size} checked={sizeChecked === size} onChange={(e) => SizeSelect(e)} />
                                            <div className='cursor-pointer hover:bg-w-200 dark:border-bk-700 dark:hover:bg-bk-700 py-3 text-xs peer-checked:border-bk-900 dark:peer-checked:border-w-100 dark:peer-checked:text-w-100 peer-checked:text-bk-900 text-bk-500 border rounded-md border-bk-100 w-10 h-10 text-center'>
                                                {size}
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
                            <button onClick={HandleAdd} 
                                className='justify-center cursor-pointer flex items-center hover:opacity-85 text-white bg-bk-900 dark:bg-blue-400 py-3 px-6 gap-3 text-sm rounded-sm'>
                                Add to cart
                            </button>
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
                    {products.length > 0 &&
                        <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
                            {products.map(item => 
                                <Cards key={item.id} routeId={item.id} title={item.title} price={item.price} image={item.stok[0].colors[0].image} inStok={stokTotal>0} />
                            )}
                        </div>
                    }
            </div>
        </main>
    )
}