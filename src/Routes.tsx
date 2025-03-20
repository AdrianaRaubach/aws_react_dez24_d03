import { Route, Routes } from "react-router-dom";
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
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { GoogleSignInCallback } from "./components/GoogleSignInCallback";
import { Page403 } from "./pages/Page403";
import { Page404 } from "./pages/Page404";

export const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/google-callback" element={<GoogleSignInCallback />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={
          <>
            <SignedIn>
              <Checkout />
            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
          </>
          } 
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/after-payment" element={
          <>
            <SignedIn>
              <AfterPayment />
            </SignedIn>
            <SignedOut>
              <Page403 />
            </SignedOut>
          </>
        } 
        />
        <Route path="/profile" element={
          <>
            <SignedIn>
              <Profile />
            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
          </>
          } 
        />
        <Route path="/login" element={
          <>
            <SignedOut>
              <Login />
            </SignedOut>
            <SignedIn>
              <Profile/>
            </SignedIn>
          </>
          } 
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
