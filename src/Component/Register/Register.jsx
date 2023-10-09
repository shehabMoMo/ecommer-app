import axios from 'axios';
import { useFormik} from 'formik'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
export default function Register() {
  let baseUrl = "https://ecommerce.routemisr.com";
  let [error,setError] = useState('')
  let [loading,setLoading] = useState(false)
  let navTo = useNavigate()
  let vlaidat = Yup.object({
    name:Yup.string().min(3,'to short').max(15,'to long').required('name required'),
    email:Yup.string().email('enter valid email').required('email required'),
    password:Yup.string().required('password required').matches(/^.{8,}$/,'enter password not less then 8 char'),
    rePassword:Yup.string().required('repassword required').oneOf([Yup.ref('password')],'enter matched password'),
    phone:Yup.string().required('phone number required').matches(/^01[1250][0-9]{8}$/,'enter valid phone')
  })
  const formic = useFormik({
    
    initialValues:{
      name:'', 
      email:'', 
      password:'', 
      rePassword:'', 
      phone:'', 
    },
    validationSchema:vlaidat,
    onSubmit:formSubmit,
  })
  async function formSubmit(values) {
    setLoading(true)
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signup`,values).catch((error)=>{
      setError(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      navTo('/login');
      setLoading(false)
    }
  }
  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>
  <div className='container my-5'>
  <h4 className='mb-2'>Register Now</h4>
  {error == ''?null:<h5 className='mp-2 text-danger'>{error}</h5>}
  <form onSubmit={formic.handleSubmit}>
    <div className='box my-2'>
      <label htmlFor="name">name:</label>
      <input onChange={formic.handleChange} onBlur={formic.handleBlur} type="text" className='form-control' id='name' name='name' />
      {formic.touched.name ? <p className='text-danger'>{formic.errors.name}</p> : ''}
    </div>
    <div className='box my-2'>
      <label htmlFor="email">email:</label>
      <input onChange={formic.handleChange} onBlur={formic.handleBlur} type="email" className='form-control' id='email' name='email' />
      {formic.touched.email ? <p className='text-danger'>{formic.errors.email}</p> : ''}
    </div>
    <div className='box my-2'>
      <label htmlFor="password">password:</label>
      <input onChange={formic.handleChange} onBlur={formic.handleBlur} type="password" className='form-control' id='password' name='password' />
      {formic.touched.password ? <p className='text-danger'>{formic.errors.password}</p> : ''}
    </div>
    <div className='box my-2'>
      <label htmlFor="rePassword">re paswword:</label>
      <input onChange={formic.handleChange} onBlur={formic.handleBlur} type="password" className='form-control' id='rePassword' name='rePassword' />
      {formic.touched.rePassword ? <p className='text-danger'>{formic.errors.rePassword}</p> : ''}
    </div>
    <div className='box my-2'>
      <label htmlFor="phone">phone:</label>
      <input onChange={formic.handleChange} onBlur={formic.handleBlur} type="tel" className='form-control' id='phone' name='phone' />
      {formic.touched.phone ? <p className='text-danger'>{formic.errors.phone}</p> : ''}
    </div>
    {loading ? <button type='button' className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' disabled={!(formic.isValid && formic.dirty)} className='btn bg-main text-white d-block ms-auto'>Register</button>}
    
    
    
  </form>
  </div>
  </>
}
