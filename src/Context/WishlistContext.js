import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let WishlistContext = createContext()
export default function WishlistProvider(props) {
    let [id,setId] = useState([])
    let baseUrl = "https://ecommerce.routemisr.com";
    let headersData = {
        token:localStorage.getItem('token')
    }
    function addToWishlist(poductId) {
        let body = {
            "productId": poductId
        }
        return axios.post(`${baseUrl}/api/v1/wishlist`,body,{headers:headersData})
    }
    function getWishlistProduct() {
        return axios.get(`${baseUrl}/api/v1/wishlist`,{headers:headersData})
    }
    function delProduct(prodactId) {
        return axios.delete(`${baseUrl}/api/v1/wishlist/${prodactId}`,{headers:headersData})
    }
  return <WishlistContext.Provider value={{addToWishlist,getWishlistProduct,delProduct,id}}>
    {props.children}
  </WishlistContext.Provider>
}
