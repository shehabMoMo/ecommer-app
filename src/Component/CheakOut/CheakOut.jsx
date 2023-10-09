import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function () {
    // let [error,setError] = useState('')
    // let [success,setsuccess] = useState('');
    // let [loading,setLoading] = useState(false);
    let {id} = useParams()
    let {chekOut} = useContext(CartContext);
    let validationSchema = Yup.object({
        details:Yup.string().required('details required'),
        phone:Yup.string().required('phone required').matches(/^01[1235][0-9]{8}$/,'enter valid phone number'),
        city:Yup.string().required('city required')
    })
    let checkOutFormik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:''
        },
        validationSchema,
        onSubmit:submitForm
    })
    async function submitForm(val) {
        let {data} = await chekOut(id,val)
        console.log(data);
        if (data.status == 'success') {
            window.location.href = data.session.url;
        }
    }
  return (
    <>
    <Helmet>
    <title>Cheak Out</title>
  </Helmet>
    <form onSubmit={checkOutFormik.handleSubmit} className=''>
            <h3 className='text-center mb-3'>Check Out</h3>
            {/* <h5 className='text-center'>{error}</h5> */}
        <div className='box my-2'>
      <label htmlFor="details">details:</label>
      <input onBlur={checkOutFormik.handleBlur} onChange={checkOutFormik.handleChange} type="text" className='form-control' id='details' name='details' />
      {checkOutFormik.touched.details ? <p className='text-danger'>{checkOutFormik.errors.details}</p>:''}
    </div>
        <div className='box my-2'>
      <label htmlFor="phone">phone:</label>
      <input onBlur={checkOutFormik.handleBlur} onChange={checkOutFormik.handleChange}  type="text" className='form-control' id='phone' name='phone' />
      {checkOutFormik.touched.phone ? <p className='text-danger'>{checkOutFormik.errors.phone}</p>:''} 
    </div>
        <div className='box my-2'>
      <label htmlFor="city">city:</label>
      <input  onBlur={checkOutFormik.handleBlur} onChange={checkOutFormik.handleChange} type="text" className='form-control' id='city' name='city' />
      {checkOutFormik.touched.city ? <p className='text-danger'>{checkOutFormik.errors.city}</p>:''}
    </div>
    {/* {success == ''?null:<p className='text-center text-success'>{success}</p>} */}
    {/* {loading ? <button className='btn btn-success w-100 mt-3 d-block'><i className='fa-solid fa-spinner fa-spin'></i></button>: */}
    <button type='submit' className='btn btn-success d-block w-100 mt-3'><i className="fa-solid fa-credit-card px-2"></i>Pay</button>
        </form> 
    </>
  )
}
