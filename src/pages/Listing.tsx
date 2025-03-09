import { useEffect, useState } from "react"
import { CurrentPage } from "../components/CurrentPage"
import api from "../service/api"
import { ProductsProps } from '../types/PropTypes'
import { IoCheckmarkSharp } from "react-icons/io5";
import { FormatDolar } from "../utils/FormatDolar";
import { Cards } from "../components/Cards";
import { FiSearch } from "react-icons/fi";
import { Filters } from "../components/Filters"

export const Listing = () => {
    const [valueRange, setValueRange] = useState<number>(0)
    const [searchInput, setSearchInput] = useState<string>('')
    const [products, setProducts] = useState<ProductsProps[]>([])

    const [inputChecked, setInputChecked] = useState<string>('')
    const handleCheckedInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setInputChecked(e.target.name)
    }
  
    useEffect(() => {
        api.get('/products').then(response => {
            setProducts(response.data)
        })
    },[])
    
    const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueRange(Number(e.target.value))
    }

    return (
        <main className='dark:bg-bk-800 font-inter'>
            <div className="mt-34 px-10 md:px-20 lg:px-45 bg-w-100 dark:bg-bk-900">
                <CurrentPage actualPage="Search"/>
            </div>
            <div className="bg-white dark:bg-bk-800 px-10 md:px-20 lg:px-45 py-10 flex items-start gap-7">
                <div className=" text-bk-900 dark:text-w-100 text-sm font-medium w-120 p-5 border border-w-200 dark:border-gray-500 rounded-md">
                    <h4 className="pb-4">Categories</h4>
                    {products.length > 0 &&
                        <ul>
                            {products.map(item => 
                                <label  key={item.category} className="flex gap-2 font-normal text-bk-600 dark:text-gray-400 py-4 border-b border-w-200 dark:border-gray-500 cursor-pointer">
                                    <input type="checkbox" className='hidden peer' name={item.category} checked={inputChecked === item.category} onChange={(e) => handleCheckedInput(e)} />
                                    <div className='border-2 flex items-center border-w-200 dark:border-gray-400 h-4.5 w-4.5 rounded-xs text-center peer-checked:bg-bk-600 peer-checked:border-bk-600 text-white dark:text-bk-800 text-sm dark:text-dark-800 dark:peer-checked:bg-w-100 dark:peer-checked:border-w-100'>
                                        <IoCheckmarkSharp />
                                    </div>
                                    <li>{item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()}</li>
                                </label>
                            )}
                        </ul>
			        }
                    <h5 className="py-8">Price</h5>
                    <div className="flex flex-col items-center pb-15 gap-5 relative w-full">
                        <input className="w-full h-1 bg-bk-300 appearance-none cursor-pointer custom-thumb" 
                            type="range" min={0} max={500} name="price-range" id="price" 
                            value={valueRange} 
                            onChange={handleChangeRange}
                        />
                        {valueRange > 0 && 
                            <div className="mt-6 text-xs px-2 py-1 rounded-sm bg-bk-900 text-white dark:bg-w-100 dark:text-bk-900 absolute transform -translate-x-1/2"
                                style={{
                                    left: `calc(${(valueRange / 500) * 100}% + ${(valueRange / 500 - 1.5) * 10}px)`
                                }}
                            >
                                <div className="absolute left-9 -top-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-bk-900 dark:border-b-w-100"></div>
                                {FormatDolar(valueRange)}
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-bk-900 text-sm dark:text-w-100 font-medium pb-5">Applied Filters:</h4>
                            <div className="flex">
                                <Filters filter="categoria"/>
                                <Filters filter={String(valueRange)}/>
                                <Filters filter={searchInput}/>
                            </div>
                        </div>
                        <div className="flex items-center text-bk-300">
                            <div className="-mr-10 z-50 text-2xl"><FiSearch /></div>
                            <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search products" type="texy" name="newsletter" className="border border-bk-100 rounded-md px-3 pl-12 py-3 text-sm md:w-50 xl:w-80 h-11" />
                        </div>
                    </div>
    
                    <div>
                        <p className="text-bk-500 text-sm dark:text-gray-400 py-10">Showing {products.length} results</p>
                        {products.length > 0 &&
                            <div className="flex flex-wrap justify-between gap-5">
                                {products.map(item => 
                                    <Cards key={item.id} title={item.title} price={item.price} image={item.stok[0].colors[0].image} inStock />
                                )}
                            </div>
			            }
                    </div>
                </div>
            </div>
        </main>
    )
}