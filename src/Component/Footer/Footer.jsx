import React from 'react';
import visaImg from '../../assets/images/visa.svg'
import amazonImg from '../../assets/images/amazon-pay.svg'
import mCardImg from '../../assets/images/mastercard.svg'
import paypalImg from '../../assets/images/paypal.svg'
import appStoreImg from '../../assets/images/appstore.png'
import googleStoreImg from '../../assets/images/googlestore.png'

export default function Footer() {
  return <>
  <div className='px-5 py-4 bg-body-tertiary'>
    <h3>Get FreshCart app</h3>
    <p className='text-muted'>We will send you a link, open it on your phone to download app.</p>
    <div className='m-4'>
    <form className='row'>
    <div className='col-9'>
    <input type="email" name='email' id='email' placeholder='Email' className='form-control' />
    </div>
    <button className='btn btn-success col-3'>Share app link</button>
    </form>
    <div className='pt-2 mt-4 d-flex justify-content-between align-items-center'>
      <div className='w-50'>
        <span>Payment Partners</span>
        <div className='row mx-2 w-50  d-inline-block'>
        <img src={amazonImg} className='col-3' alt="amazon pay" />
        <img src={visaImg} className='col-3' alt="visa" />
        <img src={mCardImg} className='col-3' alt="mastar card" />
        <img src={paypalImg} className='col-3' alt="pay pal" />
        </div>
      </div>
      <div className='w-50 me-auto'>
        <span>Get deliveries with FreshCart</span>
        <span className=''>
          <button className='btn col-3 p-0 border-0 me-3'><img className='w-100' src={appStoreImg} alt="app store" /></button>
          <button className='btn col-3 p-0 border-0'><img className='w-100' src={googleStoreImg} alt="google play" /></button>
        </span>
      </div>
    </div>
    </div>
  </div>
  </>
}
