import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage } from './pages/Homepage'
import { Listing } from "./pages/Listing";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";
import { Cart } from "./pages/Cart";
import { AfterPayment } from "./pages/AfterPayment";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { About } from "./pages/About";

export const Routers = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/after-payment" element={<AfterPayment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  )
}
