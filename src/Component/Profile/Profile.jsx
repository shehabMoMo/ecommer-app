import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Profile(userData ,userDataF) {
    let token = localStorage.getItem('token');
    let [error,setError] = useState('')
    let [success,setsuccess] = useState('');
    let [loading,setLoading] = useState(false);
    let navTo = useNavigate()
    let validationSchema = Yup.object({
        name:Yup.string().min(3,'to short').max(15,'to long').required('name required'),
        email:Yup.string().email('enter valid email').required('email required'),
        phone:Yup.string().required('phone number required').matches(/^01[1250][0-9]{8}$/,'enter valid phone')
    })
    let formic = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
        },
        validationSchema,
        onSubmit:submitForm
    })
    async function submitForm(val) {
        setLoading(true);
        let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',val,{headers:{token:token}}).catch((err)=>{
            setLoading(false);
            setError(err.response.data.errors.msg)
        })
        console.log(data);
        if (data.message == "success") {
            setsuccess(data.message)
            setLoading(false);
            navTo('/login');
            localStorage.removeItem('token')
        }
    }
    let [data,setUserData] = useState(null);
    useEffect(()=>{
        
      let userToken = jwtDecode(token)
        setUserData(userToken)
        console.log(userToken);
    },[])
    function displayForm() {
        $('.form-info').removeClass('d-none')
        $('.user-info').addClass('d-none')
    }
    function displayFormPass() {
        $('.form-pass').removeClass('d-none')
        $('.user-info').addClass('d-none')
    }
    let passFormValid = Yup.object({
        currentPassword:Yup.string().required('password required').matches(/^.{8,}$/,'enter password not less then 8 char'),
        password:Yup.string().required('password required').matches(/^.{8,}$/,'enter password not less then 8 char'),
        rePassword:Yup.string().required('repassword required').oneOf([Yup.ref('password')],'enter matched password')
    })
    let updatePassFormic = useFormik({
        initialValues:{
            currentPassword:'',
            password:'',
            rePassword:'',
        },
        validationSchema:passFormValid,
        onSubmit:submitNewPass
    })
    async function submitNewPass(val) {
        setLoading(true);
        let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',val,{headers:{token:token}}).catch((err)=>{
            setLoading(false);
            setError(err.response.data.errors.msg)
        })
        console.log(data);
        if (data.message == "success") {
            setsuccess(data.message)
            setLoading(false);
            navTo('/login');
            localStorage.removeItem('token')
        }
    }
  return (
    <div className='mt-3 py-4 bg-white col-12 col-md-6 m-auto rounded-3 px-3'>
        <Helmet>
    <title>Profile</title>
  </Helmet>
        <div className='user-info'>
        <div className='text-center py-3'>
            <i className="fa-solid fa-circle-user fa-2x text-primary"></i>
            <h2>{data?.name}</h2>
        </div>
        <div className=''>
            <h5>Your id : <span className='text-muted'>{data?.id}</span></h5>
            <h5>Your name : <span className='text-muted'>{data?.name}</span></h5>
            <h5>Your role : <span className='text-muted'>{data?.role}</span></h5>
        </div>
        <button onClick={displayForm} className='btn  my-3 d-block ms-auto'>Update your data<i className=" mx-1 fa-solid fa-pen"></i></button>
        <button onClick={displayFormPass} className='btn  my-3 d-block ms-auto'>Update your password<i className=" mx-1 fa-solid fa-pen"></i></button>
        <Link to='/allorders' className='btn btn-success my-3 d-block me-auto link-btn'>all Your orders<i className=" mx-1 fa-solid fa-pen"></i></Link>
        </div>
         <form onSubmit={formic.handleSubmit} className='d-none form-info'>
            <h3 className='text-center mb-3'>Update your data</h3>
            <h5 className='text-center'>{error}</h5>
        <div className='box my-2'>
      <label htmlFor="name">name:</label>
      <input onBlur={formic.handleBlur} onChange={formic.handleChange} type="text" className='form-control' id='name' name='name' />
      {formic.touched.name ? <p className='text-danger'>{formic.errors.name}</p>:''}
    </div>
        <div className='box my-2'>
      <label htmlFor="email">email:</label>
      <input onBlur={formic.handleBlur} onChange={formic.handleChange}  type="text" className='form-control' id='email' name='email' />
      {formic.touched.email ? <p className='text-danger'>{formic.errors.email}</p>:''} 
    </div>
        <div className='box my-2'>
      <label htmlFor="phone">phone:</label>
      <input  onBlur={formic.handleBlur} onChange={formic.handleChange} type="text" className='form-control' id='phone' name='phone' />
      {formic.touched.phone ? <p className='text-danger'>{formic.errors.phone}</p>:''}
    </div>
    {success == ''?null:<p className='text-center text-success'>{success}</p>}
    {loading ? <button className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-success d-block ms-auto'>Update data</button>}
        </form> 
         <form onSubmit={updatePassFormic.handleSubmit} className='d-none form-pass'>
            <h3 className='text-center mb-3'>Update your data</h3>
            <h5 className='text-center'>{error}</h5>
        <div className='box my-2'>
      <label htmlFor="currentPassword">currentPassword:</label>
      <input onBlur={updatePassFormic.handleBlur} onChange={updatePassFormic.handleChange} type="password" className='form-control' id='currentPassword' name='currentPassword' />
      {updatePassFormic.touched.currentPassword ? <p className='text-danger'>{updatePassFormic.errors.currentPassword}</p>:''}
    </div>
        <div className='box my-2'>
      <label htmlFor="password">password:</label>
      <input onBlur={updatePassFormic.handleBlur} onChange={updatePassFormic.handleChange}  type="password" className='form-control' id='password' name='password' />
      {updatePassFormic.touched.password ? <p className='text-danger'>{updatePassFormic.errors.password}</p>:''} 
    </div>
        <div className='box my-2'>
      <label htmlFor="rePassword">rePassword:</label>
      <input  onBlur={updatePassFormic.handleBlur} onChange={updatePassFormic.handleChange} type="password" className='form-control' id='rePassword' name='rePassword' />
      {updatePassFormic.touched.rePassword ? <p className='text-danger'>{updatePassFormic.errors.rePassword}</p>:''}
    </div>
    {success == ''?null:<p className='text-center text-success'>{success}</p>}
    {loading ? <button className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-success d-block ms-auto'>Update password</button>}
        </form> 
    </div>
  )
}
