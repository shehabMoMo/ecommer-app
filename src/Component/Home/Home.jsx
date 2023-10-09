import React, { useContext, useEffect, useState } from 'react';
import img1 from '../../assets/images/images/grocery-banner-2.jpeg';
import img2 from '../../assets/images/images/grocery-banner.png';
import img3 from '../../assets/images/images/slider-2.jpeg';
import img4 from '../../assets/images/images/slider-image-1.jpeg';
import img5 from '../../assets/images/images/slider-image-2.jpeg';
import img6 from '../../assets/images/images/slider-image-3.jpeg';
import axios from 'axios';
import $ from 'jquery'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { Helmet } from 'react-helmet';
import CategorySlider from '../categorieslider/CategorieSlider';

export default function Home({userData}) {
  let [prodacts,setProdact] = useState([])
  let baseUrl = "https://ecommerce.routemisr.com";
  let navTo = useNavigate()
  let {addProdact,setCartCount} = useContext(CartContext);
  let {addToWishlist} = useContext(WishlistContext);
  async function addProductToWishlist(prodactId) {
    let {data} = await addToWishlist(prodactId)
    console.log(data);
    if (data.status == 'success') {
      toast(data.message,{icon:<i class="fa-solid fa-heart text-danger"></i>})
    }
  }
  async function sendId(id) {
    let {data} = await addProdact(id)
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message)
      setCartCount(data.numOfCartItems)
    }
  }
  useEffect(()=>{
    getProdact()
    $('.page-item').on('click',function(e){
      let index = $(e.target).html()
      getProdact(index)
    })
  },[])
  async function getProdact(index=1) {
    $('.loading').fadeIn()
    let {data} = await axios.get(`${baseUrl}/api/v1/products?page=${index}`);
    $('.loading').fadeOut(2000)
    setProdact(data.data)
  }
  function productDetails() {
    navTo('/productDetails')
  }
  // $('.heart').on('mouseenter',function(){
  //   $('.like').removeClass('d-none').addClass('d-inline-block')
  //   $('.unlike').removeClass('d-inline-block').addClass('d-none')
  // })
  // $('.heart').on('mouseleave',function(){
  //   $('.like').removeClass('d-inline-block').addClass('d-none')
  //   $('.unlike').removeClass('d-none').addClass('d-inline-block')
  // })
  return <>
  {/* head */}
  <Helmet>
    <title>Home</title>
  </Helmet>
  {/* head */}
  <div className='loading position-fixed top-0 end-0 start-0 bottom-0 justify-content-center align-items-center bg-light '>
  
  <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

</div>
  <Toaster/>
  <div className='row mb-5'>
    <div className='col-md-8 p-0'>
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={img4} className="d-block w-100 img-slider" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img5} className="d-block w-100 img-slider" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img6} className="d-block w-100 img-slider" alt="..."/>
    </div>
  </div>
</div>
    </div>
    <div className='col-md-4 p-0'>
      <img src={img1} alt=""  className='d-block w-100 h-50'/>
      <img src={img2} alt="" className='d-block w-100 h-50' />
    </div>
  </div>
  <CategorySlider/>
  <div className='row mb-4 g-4'>
    {prodacts.map((prodact)=>{
      return <div key={prodact._id} className='col-md-2 col-4 '>
      <div  className='product cursor-pointer position-relative'>
      <Link to={'/productDetails/' + prodact._id}>
      <img src={prodact.imageCover} className='w-100' alt="" />
      <p className='text-main m-0 font-sm'>{prodact.category.name}</p>
      <h6 className=''>{prodact.title.split(' ').slice(0,2).join(' ')}</h6>
      <div className='font-sm d-flex justify-content-between'>
        <span>{prodact.price}EGP</span>
        <span><i className="fa-solid fa-star rating-color"></i><span className='text-muted'>{prodact.ratingsAverage}</span></span>
      </div>
      </Link>
      <button onClick={()=>sendId(prodact._id)} className='btn btn-success w-100'>Add to Cart</button>
      <p  className='position-absolute top-0 end-0 p-1 heart bg-info'><i onClick={()=>{addProductToWishlist(prodact._id)}} class="fa-solid fa-heart  text-dark like"></i></p>
      </div>
      </div>
    })}
    
  </div>
  <div className='d-flex justify-content-center my-5'>
  <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
  
  </>
}
