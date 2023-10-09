import axios from 'axios';
import React, { createContext } from 'react'

export let BrandContext = createContext();
export default function BrandProvider(props) {
    let baseUrl = "https://ecommerce.routemisr.com";
    function getBrands(page=1) {
        return axios.get(`${baseUrl}/api/v1/brands?limit=10&page=${page}`)
    }
  return <BrandContext.Provider value={{getBrands}}>
    {props.children}
  </BrandContext.Provider>
}
