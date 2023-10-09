import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContext';
export default function Navbar({userData,signOut}) {
  let {cartCount} = useContext(CartContext)
  let token = localStorage.getItem('token')
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid px-5">
    <Link className="navbar-brand" to={userData != null && token != null ? 'home' : 'login'}><img src={Logo} alt="logo" className='w-100' /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {userData != null ? <div className="collapse navbar-collapse pt-1" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='home' className="nav-link ">Home</Link>
        </li>
        <li className="nav-item">
          <Link to='categories' className="nav-link" href="#">Categories</Link>
        </li>
        <li className="nav-item">
          <Link to='brands' className="nav-link" href="#">Brands</Link>
        </li>
        <li className="nav-item">
          <Link to='cart' className="nav-link position-relative" href="#">Cart
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
            </span>
          </Link>
        </li>
      </ul>
    </div> : ''}
    <div className="collapse navbar-collapse pt-1" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex justify-content-center align-items-center">
          <a className='mx-2' href="#"><i className="fa-brands fa-instagram"></i></a>
          <a className='mx-2' href="#"><i className="fa-brands fa-facebook"></i></a>
          <a className='mx-2' href="#"><i className="fa-brands fa-tiktok"></i></a>
          <a className='mx-2' href="#"><i className="fa-brands fa-linkedin"></i></a>
          <a className='mx-2' href="#"><i className="fa-brands fa-youtube"></i></a>
        </li>
        {userData == null && token == null ? <>
          <li className="nav-item">
          <Link to='' className="nav-link" href="#">Register</Link>
        </li>
        <li className="nav-item">
          <Link to='login' className="nav-link" href="#">Login</Link>
        </li>
        </> : <>
        <li className="nav-item">
        <Link to='profile' className="nav-link"><i class="fa-solid fa-circle-user fa-2x"></i></Link>
      </li>
        <li className="nav-item">
        <Link to='wishlist' className="nav-link"><i class="fa-solid fa-heart fa-2x"></i></Link>
      </li>
      <li className="nav-item">
          <span className='nav-link cursor-pointer' onClick={signOut}>SignOut</span>
        </li> 
        </>}
      </ul>
    </div>
  </div>
</nav>
  </>
}
