import React from 'react';
import img404 from '../../assets/images/error.svg';
import { Helmet } from 'react-helmet';

export default function Notfound() {
  return (<>
  <Helmet>
    <title>Not found</title>
  </Helmet>
  <h2 className='fs-1 text-center pt-5'>Page Not Found</h2>
    <div className='w-50 m-auto'>
    <img src={img404} className='w-100' alt="" />
    </div>
  </>
  )
}
