import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Login({userDataF}) { 
  let baseUrl = "https://ecommerce.routemisr.com";
  let [errorMessage,setError] = useState('');
  let [loading,setLoading] = useState(false);
  const navTo = useNavigate()
  let validationSchema = Yup.object({
    email:Yup.string().required('email required').email('enter valid email'),
    password:Yup.string().required('password required')
  })
  const loginFormic = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema,
    onSubmit:loginSubmit
  })
  async function loginSubmit(val) {
    setLoading(true);
    let {data} = await axios.post(`${baseUrl}/api/v1/auth/signin`,val).catch((error)=>{
      console.log(error.response.data.message);
      setError(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      navTo('/home');
      setLoading(false);
      userDataF(data.user)
      localStorage.setItem('token',data.token)
    }
  }
  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
  <div className='container my-5 py-5'>
    <h4 className='mb'>Login Now</h4>
    {errorMessage == ''?null:<h5 className='mp-2 text-danger'>{errorMessage}</h5>}
    <form onSubmit={loginFormic.handleSubmit}>
      <div className='box my-2'>
        <label htmlFor="email">email</label>
        <input onChange={loginFormic.handleChange} onBlur={loginFormic.handleBlur} type="email" name='email' id='email' className='form-control' />
        {loginFormic.touched.email ? <p className='text-danger'>{loginFormic.errors.email}</p> : ''}
      </div>
      <div className='box my-2'>
        <label htmlFor="password">password</label>
        <input onChange={loginFormic.handleChange} onBlur={loginFormic.handleBlur} type="password" name='password' id='password' className='form-control' />
        {loginFormic.touched.password ? <p className='text-danger'>{loginFormic.errors.password}</p> : ''}
      </div>
      {loading ? <button type='button' className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button> :<button type='submit' disabled={!(loginFormic.dirty && loginFormic.isValid)} className='btn btn-success ms-auto d-block' >Login</button>}
      
    </form>
    <Link to='/forgetPass' className='text-center d-block fs-6 mt-5 text-muted link'>Forgot Password?</Link>
  </div>
  </>
}
