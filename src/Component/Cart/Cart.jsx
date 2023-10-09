import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import $ from 'jquery';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart({userData}) {
  let {displayCart,delprodact,clearCart,updateQuantity,setCartCount} = useContext(CartContext);
  let [display,setDisplay] = useState(null);

  useEffect(()=>{
    displayData()
  },[])
  async function clear() {
    let {data} = await clearCart();
    if (data.message == "success") {
      setDisplay(null)
    }
  }
  async function updateCount(id,count) {
    let {data} = await updateQuantity(id,count)
    setDisplay(data.data)
  }
  async function del(id) {
    let {data} = await delprodact(id)
    console.log(data);
    if (data.status == "success") {
      setDisplay(data.data);
      setCartCount(data.numOfCartItems);
      toast.success('Product was deleted');
    }
  }
  async function displayData() {
    $('.loading').fadeIn()
    let {data} = await displayCart()

    if (data.status == "success") {
      setDisplay(data.data)
    $('.loading').fadeOut(2000)
    return "success"
    }else{
      setDisplay(null)
    }
    
  }
  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  <Toaster/>
  <div className='loading position-fixed top-0 end-0 start-0 bottom-0 justify-content-center align-items-center bg-light '>
  
  <div className="spinner-grow text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

</div>
  <div className='row'>
    
    <div className='col-md-7'>
      <div className='bg-white p-3 rounded-3'>
    <h4 className=' fw-bold text-dark'><i className="fa-solid fa-cart-shopping fa-xs"></i> My Cart</h4>
    {display== null ?<h4>Empty Cart</h4>:''}
    <div className='py-4'>

  {display?.products.map((el)=>{return <div key={el._id} className='row my-1 border-top border-1 border-light-subtle p-1 cart'>
    <div className='col-1 border-end border-1 d-flex justify-content-center align-items-center'>
      <button onClick={()=>del(el?.product._id)} className='btn btn btn-outline-danger border-0'>
      <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
    <div className='cart-img col-3'>
      <img src={el?.product.imageCover} className='w-100' alt="cover product" />
    </div>
    <div className='col-8 pt-3'>
      <div className='d-flex justify-content-between'>
        <div>
        <h6>{el?.product.title.split(' ').slice(0,2).join(' ')}</h6>
        <p className='text-muted font-sm'>{el?.product.brand.name}</p>
        </div>
        <div className='text-center'>
          <h6>quantity</h6>
          <button onClick={()=>updateCount(el?.product._id,el?.count + 1)} className='btn btn-outline-dark btn-sm border border-1'>
          <i className="fa-solid fa-plus"></i>
          </button>
          <span className='mx-2'>{el?.count}</span>
          <button disabled={el?.count==1} onClick={()=>updateCount(el?.product._id,el?.count - 1)} className='btn btn-outline-dark btn-sm border border-1'>
          <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <div className='text-center '>
        <h6>price</h6>
        <p>{el?.price} EGP</p>
        </div>
      </div>
    </div>
  </div>
  })}
    </div>
  <div className='d-flex justify-content-between py-2'>
  <button onClick={clear} className='btn btn-outline-warning w-25'>clear Cart</button>
  <div>
  <span className='fs-5'>Total Price  </span>
    <span className='fs-6'>{display?.totalCartPrice} EGP</span>
  </div>
  </div>
  </div>
    </div>
  <div className='col-md-5'>
  <div className=' p-3 bg-white rounded-3'>
    <div className='total-price'>
      
        <h3>Total</h3>
      <div className='d-flex justify-content-between'>
      <span className='fs-4'>Total Price : </span>
    <span className='fs-5'>{display?.totalCartPrice} EGP</span>
      </div>
    <Link to={'/cheakout/'+display?._id} className='d-block btn btn-success w-100 link-btn'>Check Out</Link>
    </div>
  </div>
  </div>
  </div>
  </>
}
