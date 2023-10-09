import logo from "./logo.svg";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Login from "./Component/Login/Login";
import Prodacts from "./Component/Prodacts/Prodacts";
import NotFound from "./Component/Notfound/Notfound";
import Brands from "./Component/Brands/Brands";
import Register from "./Component/Register/Register";
import Categories from "./Component/Categories/Categories";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Gard from "./Component/Gard/Gard";
import ForgetPass from "./Component/ForgetPass/ForgetPass";
import ResetNewpass from "./Component/ResetNewpass/ResetNewpass";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CartProvider from "./Context/CartContext";
import Gard2 from "./Component/Gard/Gard2";
import Profile from "./Component/Profile/Profile";
import CheakOut from "./Component/CheakOut/CheakOut";
import AllOrders from "./Component/AllOrders/AllOrders";
import Wishlist from "./Component/Wishlist/Wishlist";
import WishlistProvider from "./Context/WishlistContext";
import CategoriesProvider from "./Context/CategoriesContext";
import BrandProvider from "./Context/BrandContext";

function App() {
  let [userData, setData] = useState(null);
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      let userToken = jwtDecode(token)
      userDataF(userToken)
    }
  },[])
  function userDataF(data) {
    setData(data);
  }
  function signOut() {
    localStorage.removeItem('token');
    userDataF(null);
    <Navigate to='/login' />

  }
  function ProtectedRouter2(props) {
    if (localStorage.getItem("userToken") != null) {
      return <Navigate to='home' />
    } else {
      return props.children
    }
  }
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} signOut={signOut} />,
      children: [
        { index: true, element:<ProtectedRouter2><Register /></ProtectedRouter2>  },
        { path: "login", element: <Login userDataF={userDataF} /> },
        { path: "home", element: <Gard2><Home userData={userData} /></Gard2> },
        { path: "cart", element: <Gard><Cart userData={userData} /></Gard> },
        { path: "product", element: <Gard><Prodacts userData={userData} /></Gard> },
        { path: "brands", element: <Gard><Brands userData={userData} /></Gard> },
        { path: "categories", element: <Gard><Categories userData={userData} /></Gard> },
        { path: "cheakout/:id", element: <Gard><CheakOut userData={userData} /></Gard> },
        { path: "allorders", element: <Gard><AllOrders userData={userData} /></Gard> },
        { path: "wishlist", element: <Gard><Wishlist userData={userData} /></Gard> },
        { path: "profile", element: <Gard><Profile userData={userData} userDataF={userDataF} /></Gard> },
        { path: "productDetails/:id", element: <Gard><ProductDetails userData={userData} /></Gard> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "resetNewpass", element: <ResetNewpass /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  
  return (
    <>
    <BrandProvider>
    <CategoriesProvider>
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
      </WishlistProvider>
      </CategoriesProvider>
      </BrandProvider>
      
      
      
    </>
  );
}

export default App;
