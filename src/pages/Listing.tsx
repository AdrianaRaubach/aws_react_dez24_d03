import { useEffect, useState } from "react"
import { CurrentPage } from "../components/CurrentPage"
import api from "../service/api"
import { ProductsProps } from '../types/PropTypes'
import { IoCheckmarkSharp } from "react-icons/io5";
import { FormatDolar } from "../utils/FormatDolar";
import { Cards } from "../components/Cards";
import { FiSearch } from "react-icons/fi";
import { Filters } from "../components/Filters"
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { activePage } from "../redux/actions";

export const Listing = () => {
    const [valueRange, setValueRange] = useState<number>(0)
    const [searchInput, setSearchInput] = useState<string>('')
    const [products, setProducts] = useState<ProductsProps[]>([])
    const [inputChecked, setInputChecked] = useState<string>('')
    const itemsPerPage: number = 9
    const actualPage: number = useSelector((state) => Number(state.filterProducts.page))
    const startIndex = actualPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const dispatch = useDispatch()

    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    },[])

    useEffect(() => {
        if(localStorage.inputChecked !== undefined)setInputChecked(String(localStorage.inputChecked))
        if(localStorage.searchInput !== undefined)setSearchInput(String(localStorage.searchInput))
        if(localStorage.valueRange !== undefined)setValueRange(Number(localStorage.valueRange))
    },[])

    const maxValue = Math.max.apply(null, products.map((item) => item.price))
    
    const handleCheckedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputChecked === e.target.name) {
            setInputChecked('')
            return
        }
        dispatch(activePage(0))
        setInputChecked(e.target.name)
        localStorage.inputChecked = e.target.name
    }
  
    const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(activePage(0))
        setValueRange(Number(e.target.value))
        localStorage.valueRange = e.target.value
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(activePage(0))
        setSearchInput(e.target.value)
        localStorage.searchInput = e.target.value
    }

    const handleCloseFilter = (filter : string) => {
        switch(filter){
            case "category":
                setInputChecked('')
                localStorage.removeItem('inputChecked')
                break
            case "value":
                setValueRange(0)
                localStorage.removeItem('valueRange')
                break
            case "search":
                setSearchInput('')
                localStorage.removeItem('searchInput')
                break
        }
    }

    const categoriesList = [...new Set(products.map((item) => item.category))]

    const results = products.filter(item => 
        ((inputChecked !== '') ? item.category === inputChecked: item.category) 
        && ((valueRange !== 0) ? item.price <= valueRange: item.price <= item.price) 
        && ((searchInput !== '') ? item.title.toLowerCase().includes(searchInput.toLowerCase()): item.title)
    )

    const filterItems = results.slice(startIndex, endIndex)

    const previousPage = () => {
        if(actualPage === 0) return
        dispatch(activePage((actualPage - 1)))
    }

    const nextPage = () => {
        if(endIndex >= results.length) return
        dispatch(activePage((actualPage + 1)))
    }

    return (
        <main className='dark:bg-bk-800 font-inter'>
            <div className="mt-42 sm:mt-34 px-10 md:px-20 lg:px-45 bg-w-100 dark:bg-bk-900">
                <CurrentPage actualPage="Search"/>
            </div>
            <div className="bg-white dark:bg-bk-800 px-10 md:px-20 lg:px-45 py-10 flex flex-col md:flex-row items-start gap-7">
                <div className=" text-bk-900 dark:text-w-100 text-sm font-medium w-full md:w-248px p-5 border border-w-200 dark:border-gray-500 rounded-md">
                    <h4 className="pb-4">Categories</h4>
                    {products.length > 0 &&
                        <ul>
                            {categoriesList.map(item => 
                                <label key={item} className="flex gap-2 font-normal text-bk-600 dark:text-gray-400 py-4 border-b border-w-200 dark:border-gray-500 cursor-pointer">
                                    <input type="checkbox" className='hidden peer' name={item} checked={inputChecked === item} onChange={(e) => handleCheckedInput(e)} />
                                    <div className='border-2 flex items-center border-w-200 dark:border-gray-400 h-4.5 w-4.5 rounded-xs text-center peer-checked:bg-bk-600 peer-checked:border-bk-600 text-white dark:text-bk-800 text-sm dark:text-dark-800 dark:peer-checked:bg-w-100 dark:peer-checked:border-w-100'>
                                        <IoCheckmarkSharp />
                                    </div>
                                    <li>{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</li>
                                </label>
                            )}
                        </ul>
			        }
                    <h5 className="py-8">Price</h5>
                    <div className="flex flex-col items-center pb-15 gap-5 relative w-full">
                        <input className="w-full h-1 bg-bk-300 appearance-none cursor-pointer custom-thumb" 
                            type="range" min={0} max={Math.ceil(maxValue)} name="price-range" id="price" 
                            value={valueRange} 
                            onChange={handleChangeRange}
                        />
                        {valueRange > 0 && 
                            <div className="mt-6 text-xs px-2 py-1 rounded-sm bg-bk-900 text-white dark:bg-w-100 dark:text-bk-900 absolute transform -translate-x-1/2"
                                style={{
                                    left: `calc(${(valueRange / maxValue) * 100}% + ${(valueRange / maxValue - 1.5) * 10}px)`
                                }}
                            >
                                <div className="absolute left-9 -top-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-bk-900 dark:border-b-w-100"></div>
                                {FormatDolar(valueRange)}
                            </div>
                        }
                    </div>
                </div>
                <div className="w-full md:w-9/12 flex flex-col gap-10 pb-25">
                    <div className="flex justify-between">
                        {(inputChecked !== '' || valueRange > 0 || searchInput !== '') && 
                            <div>
                                <h4 className="text-bk-900 text-sm dark:text-w-100 font-medium pb-5 mt-20 md:mt-0">Applied Filters:</h4>
                                <div className="flex gap-3 flex-wrap">
                                    {(inputChecked !== '') && <Filters onClick={()=> handleCloseFilter('category')} filter={inputChecked}/>}
                                    {(valueRange !== 0 ) && <Filters onClick={()=> handleCloseFilter('value')} filter={String(FormatDolar(valueRange))}/>}
                                    {(searchInput!== '') && <Filters onClick={()=> handleCloseFilter('search')} filter={searchInput}/>}
                                </div>
                            </div>
                        }
                        <div className="flex items-center text-bk-300 absolute right-10 md:right-20 lg:right-45">
                            <div className="-mr-10 z-50 text-2xl"><FiSearch /></div>
                            <input value={searchInput} onChange={(e) => handleSearch(e)} placeholder="Search products" type="texy" name="newsletter" className="border border-bk-100 rounded-md px-3 pl-12 py-3 text-sm md:w-50 xl:w-80 h-11" />
                        </div>
                    </div>
    
                    <div>
                        <p className="text-bk-500 text-sm dark:text-gray-400 py-10 mt-8 md:mt-0">
                            Showing {startIndex+1} - {(endIndex > results.length)? results.length : endIndex} Of {results.length} Results.
                        </p>
                        {filterItems.length > 0 &&
                            <div className="flex flex-wrap justify-center sm:justify-between gap-5">
                                {filterItems.map(item => 
                                    <Cards key={item.id} routeId={item.id} title={item.title} price={item.price} image={item.stok[0].colors[0].image} 
                                        inStok={((item.stok.map((item) => 
                                            item.colors.map((colorQtd) => colorQtd.qtd))).flat().reduce(
                                            (accumulator, currentValue) => accumulator + currentValue,
                                            0,
                                        )) > 0 }
                                    />
                                )}
                            </div>
			            }
                    </div>
                    <div className="self-center flex border rounded border-w-200 py-1 px-2 text-xs gap-2">
                        <button className="px-3 cursor-pointer dark:text-w-100" onClick={previousPage}><SlArrowLeft /></button>
                        <p className="bg-w-100 py-2 px-4 rounded dark:bg-bk-700 dark:text-w-100">{actualPage + 1}</p>
                        <button className="px-3 cursor-pointer dark:text-w-100" onClick={nextPage}><SlArrowRight /></button>
                    </div>
                </div>
            </div>
        </main>
    )
}