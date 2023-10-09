import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Wishlist(userData) {
    let {getWishlistProduct,delProduct} = useContext(WishlistContext);
    let [products,setprodacts] = useState(null)
    useEffect(()=>{
        displayWishlist()
    },[])
    async function  displayWishlist() {
        $('.loading').fadeIn()
        let {data} = await getWishlistProduct()
        console.log(data.data);
        if (data.status == 'success') {
            setprodacts(data.data)
            $('.loading').fadeOut()
        }
    }
    async function  deleteProduct(productId) {
        let {data} = await delProduct(productId)
        if (data.status == 'success') {
            toast.success(data.message)
            displayWishlist()
        }
    }
  return <>
  <Helmet>
    <title>Wishlist</title>
  </Helmet>
  <div className='loading position-fixed top-0 end-0 start-0 bottom-0 justify-content-center align-items-center bg-light '>
  
  <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

</div>
<Toaster/>
  <div className=''>
      <div className='bg-white p-3 rounded-3'>
    <h4 className=' fw-bold text-dark'><i class="fa-solid fa-list"></i> WishList</h4>
    <div className='py-4'>

  {products?.map((el)=>{return <div key={el._id} className='row my-1 border-top border-1 border-light-subtle p-1 cart'>
    <div className='col-1 border-end border-1 d-flex justify-content-center align-items-center'>
      <button onClick={()=>{deleteProduct(el.id)}} className='btn btn btn-outline-danger border-0'>
      <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
    
    <Link to={'/productDetails/'+ el.id} className='cart-img col-3'>
      <img src={el?.imageCover} className='w-100' alt="cover product" />
    </Link>
    <div className='col-8 pt-3'>
    <Link to={'/productDetails/'+ el.id}>
      <div className='d-flex justify-content-between'>
        <div>
        <h6>{el?.title.split(' ').slice(0,2).join(' ')}</h6>
        <p className='text-muted font-sm'>{el?.brand.name}</p>
        </div>
        <div className='text-center'>
          <h6>quantity</h6>
          <p>{el?.quantity} </p>
        </div>
        <div className='text-center '>
        <h6>price</h6>
        <p>{el?.price} EGP</p>
        </div>
      </div>
      </Link>
    </div>
    
  </div>
  })}
    </div>
    </div>
    </div>
    
  </>
}
