import React, { useContext, useEffect, useState } from 'react'
import { BrandContext } from '../../Context/BrandContext';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Brands({userData}) {
  let [brands,setBrands] = useState([])
  useEffect(()=>{
    displayBrands();
    $('.page-item').on('click',function(e){
      let index = $(e.target).html()
      displayBrands(index)
    })
    
  },[])
  let {getBrands} = useContext(BrandContext);
  async function displayBrands(index) {
    let {data}= await getBrands(index);
    console.log(data);
    setBrands(data.data)
  }
  return <>
  <Helmet>
    <title>brands</title>
  </Helmet>
  <div className='row mb-4 g-4'>
    {brands.map((brands)=>{
      return <div key={brands._id} className='col-md-3 col-4 '>
      <div  className='product cursor-pointer position-relative'>
      <Link>
      <img src={brands.image} className='categorie-img w-100' alt="" />
      <h6 className='text-center mt-3'>{brands.name}</h6>
      </Link>
      </div>
      </div>
    })}
    
  </div>
  <div className='d-flex justify-content-center my-5'>
  <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">4</a></li>
    <li className="page-item"><a className="page-link" href="#">5</a></li>
    <li className="page-item"><a className="page-link" href="#">6</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
  </>
}
