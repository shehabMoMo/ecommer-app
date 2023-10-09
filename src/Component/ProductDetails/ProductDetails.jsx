import React, { useContext, useEffect, useState } from 'react';
import img3 from '../../assets/images/images/slider-2.jpeg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  let [prodact,setProdact] = useState([])
  let {id} = useParams();
  let {addProdact,setCartCount} = useContext(CartContext);
  async function addToCart(id) {
    let {data} = await addProdact(id);
    console.log(data);
    if(data.status == "success"){
      toast.success(data.message);
      setCartCount(data.numOfCartItems)
    }
  }
  
  useEffect(()=>{
    getProdact(id)
  },[]);
  let baseUrl = "https://ecommerce.routemisr.com";
  async function getProdact(id) {
    $('.loading').fadeIn(1500);
    let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`);
    setProdact(data.data);
    $('.loading').fadeOut(1500);
  }
  return (<>
  <Helmet>
    <title>Product</title>
  </Helmet>
  <Toaster/>
    <div className='loading position-fixed top-0 end-0 start-0 bottom-0 justify-content-center align-items-center bg-light '>
  
  <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

</div>
    <div className='container my-5'>
        <div className='row'>
            <div key={prodact._id} className='col-md-4'>
            <img src={prodact.imageCover} alt="" className='w-100' />
            </div>
            <div className='col-md-8 d-flex align-items-center'>
                <div className='w-100'>
                <p className='fs-6'>{prodact.title}</p>
                <p className='font-sm text-muted px-3'>{prodact.description}</p>
                <p className='font-sm'>{prodact.category?.name}</p>
                <div className='font-sm d-flex justify-content-between'>
                    <span>{prodact.price}EGP</span>
                    <span><i className="fa-solid fa-star rating-color"></i><span className='text-muted'>{prodact.ratingsAverage}</span></span>
                </div>
                <button onClick={()=>addToCart(prodact._id)} className='btn btn-success w-100'>+ add to cart</button>
                </div>
            </div>
        </div>

    </div>
    </>)
}
