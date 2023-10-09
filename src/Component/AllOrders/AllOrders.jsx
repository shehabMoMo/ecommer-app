import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  let token = localStorage.getItem('token');
  let [orders,setOrders] = useState(null);
  let userToken = jwtDecode(token)
  let {id} = userToken 
        console.log(id);
  useEffect(()=>{
    getAllOrders()
  },[])
  async function getAllOrders() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    setOrders(data);
    console.log(data);
  }

  return (
    <>
    <Helmet>
    <title>Orders</title>
  </Helmet>
    <div className=''>
      <div className='bg-white p-3 rounded-3'>
    <h4 className=' fw-bold text-dark'><i class="fa-solid fa-truck-ramp-box "></i> All Orders</h4>
    <div className='py-4'>

  {orders?.map((el,index)=>{return <div key={el._id} className='row my-1 border-top border-1 border-light-subtle p-1'>
    <div className='col-1 border-end border-1 d-flex justify-content-center align-items-center'>
    <i class="fa-solid fa-box-open"></i>
    </div>
    <div className='col-3'>
      <h6>User</h6>
      <p className='m-0'>Name : {el?.user.name}</p>
      <p className='m-0'>email : {el?.user.email}</p>
      <p className='m-0'>phone : {el?.user.phone}</p>
    </div>
    <div className='col-8 pt-3'>
      <div className='d-flex justify-content-between'>
        <div>
        <h6>Updated at</h6>
        <p className='text-muted font-sm'>{el?.updatedAt}</p>
        </div>
        <div className='text-center '>
        <h6>Total price</h6>
        <p>{el?.totalOrderPrice} EGP</p>
        </div>
        <div className='text-center'>
          <button className='btn btn-success' data-bs-toggle="modal" data-bs-target={"#"+index}>details</button>
        </div>
         
    <div className="modal" id={index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Details of order</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {el?.cartItems.map((el,index)=>{
          return<div className='row'>
            <div className='col-1'>
            {index}
            </div>
          <div key={index} className='col-11 border-bottom border-bottom-2 mb-3'>
          <p className='m-0'>product name : <span className='fs-6 text-muted'>{el.product.title}</span></p>
          <p className='m-0'>product count : <span className='fs-6 text-muted'>{el.count}</span></p>
          <p className='m-0'>product price : <span className='fs-6 text-muted'>{el.price}EGP</span></p>
          </div>
        </div>
        })}
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    
      </div>
    </div>
  </div>
  })}
    </div>
    </div>
    </div>
    
    </>
  )
}
