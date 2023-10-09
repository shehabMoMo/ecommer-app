import axios from "axios";
import { error } from "jquery";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartProvider(props) {
    // let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',id,token)
    let [cartCount,setCartCount] = useState(0)
    let headersData = {
        token:localStorage.getItem('token')
    }
    useEffect(()=>{
       async function getData() {
        let {data} = await  displayCart()
        setCartCount(data.numOfCartItems)
        }
        getData()
    },[])
     function addProdact(id) {
        let body = {
            "productId": id
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',body,{headers:headersData})
    }
    function displayCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:headersData})
        // .then((res) => res)
        // .catch((err)=>err)
    }
    function delprodact(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:headersData})
    }
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headersData})
    }
    function chekOut(cartId,shippingData) {
        let body = {
            shippingAddress : shippingData
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,body,{headers:headersData}).catch((error)=>{
            console.log(error.response.data.message);
        })
    }
    
    function updateQuantity(id,count) {
        let body = {
            "count": count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body,{headers:headersData})
    }
    return <CartContext.Provider value={{addProdact,displayCart,delprodact,clearCart,updateQuantity,cartCount,setCartCount,chekOut}}>
{props.children}
    </CartContext.Provider>
}