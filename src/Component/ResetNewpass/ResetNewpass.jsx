import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ResetNewpass() {
    let baseUrl = "https://ecommerce.routemisr.com";
  let [errorMessage,setError] = useState('');
  let [loading,setLoading] = useState(false);
  const navTo = useNavigate()
  let validationSchema = Yup.object({
    email:Yup.string().required('email required').email('enter valid email'),
    newPassword:Yup.string().required('password required').matches(/^.{8,}$/,'enter password not less then 8 char')
  })
  const loginFormic = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    validationSchema,
    onSubmit:loginSubmit
  })
  async function loginSubmit(val) {
    setLoading(true);
    let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`,val).catch((error)=>{
      console.log(error.response.data.message);
      setError(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.token) {
      navTo('/login');
      setLoading(false);
    }
  }
  return <>
  <Helmet>
    <title>Reset New Password</title>
  </Helmet>
  <div className='container my-5 py-5'>
    <h4 className='mb'>Reset new password</h4>
    {errorMessage == ''?null:<h5 className='mp-2 text-danger'>{errorMessage}</h5>}
    <form onSubmit={loginFormic.handleSubmit}>
      <div className='box my-2'>
        <label htmlFor="email">email</label>
        <input onChange={loginFormic.handleChange} onBlur={loginFormic.handleBlur} type="email" name='email' id='email' className='form-control' />
        {loginFormic.touched.email ? <p className='text-danger'>{loginFormic.errors.email}</p> : ''}
      </div>
      <div className='box my-2'>
        <label htmlFor="newPassword">newPassword</label>
        <input onChange={loginFormic.handleChange} onBlur={loginFormic.handleBlur} type="password" name='newPassword' id='newPassword' className='form-control' />
        {loginFormic.touched.newPassword ? <p className='text-danger'>{loginFormic.errors.newPassword}</p> : ''}
      </div>
      {loading ? <button type='button' className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button> :<button type='submit' disabled={!(loginFormic.dirty && loginFormic.isValid)} className='btn btn-success ms-auto d-block' >Login</button>}
      
    </form>
  </div>
  </>
}
