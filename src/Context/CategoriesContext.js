import axios from 'axios'
import React, { createContext } from 'react'

export let CategoriesContext = createContext()
export default function CategoriesProvider(props) {
    let baseUrl = "https://ecommerce.routemisr.com";
    function getCategorie(page=1) {
        return axios.get(`${baseUrl}/api/v1/categories?page=${page}`)
    }
  return <CategoriesContext.Provider value={{getCategorie}}>
{props.children}
  </CategoriesContext.Provider>
}
