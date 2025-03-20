import { Routers } from "./Routes"
import { ToggleTheme } from "./components/ToggleTheme"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { useDispatch } from 'react-redux';
import { localStorageInfos, localStorageCartItems, clearCart } from "./redux/actions";
import { useEffect } from "react";

function App() {
  const html = document.querySelector('html')

  const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]')
  const savedCartSubtotal = parseFloat(localStorage.getItem('cartSubtotal') || '0')
  const savedCartTotal = parseFloat(localStorage.getItem('cartTotal') || '0')
  const savedShippingTax = parseFloat(localStorage.getItem('shippingTax') || '0')
  const savedShipping = localStorage.getItem('shipping') || ''

  const dispatch = useDispatch()
  
  useEffect(() => {
    if(localStorage.theme === "dark") {
      html?.classList.add('dark')
    }
    dispatch(clearCart())
    dispatch(localStorageInfos({subtotal:savedCartSubtotal, total:savedCartTotal, shipping:savedShipping, tax:savedShippingTax, qtd:0, price:0}))
    dispatch(localStorageCartItems(savedCartProducts))
  },[])

  return (
    <>
      <Header/>
      <ToggleTheme/>
      <Routers/>
      <Footer/>
    </>
  )
}

export default App
