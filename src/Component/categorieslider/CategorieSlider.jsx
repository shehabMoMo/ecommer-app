import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { CategoriesContext } from '../../Context/CategoriesContext';

export default function CategorySlider() {

    let {getCategorie}= useContext(CategoriesContext)
    let [categorieList,setcategorie] = useState([])
    useEffect(()=>{
      getCategoriesData();
    },[])
    async function getCategoriesData() {
      let {data}= await getCategorie();
      console.log(data);
      setcategorie(data.data)
    }
    return (
        <div>

            <OwlCarousel className='owl-theme' items={8} loop  >
                {categorieList.map((el) => {
                    return <div class='item'>
                        <img src={el.image} className='smallImg' alt="" />
                    </div>
                })}
            </OwlCarousel>


        </div>
    )
}