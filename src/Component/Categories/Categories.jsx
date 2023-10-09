import React, { useContext, useEffect, useState } from 'react'
import { CategoriesContext } from '../../Context/CategoriesContext';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories({userData}) {
  let {getCategorie}= useContext(CategoriesContext)
  let [categorie,setcategorie] = useState([])
  useEffect(()=>{
    getCategoriesData();
    $('.page-item').on('click',function(e){
      let index = $(e.target).html()
      getCategoriesData(index)
    })
  },[])
  async function getCategoriesData(index) {
    let {data}= await getCategorie(index);
    console.log(data);
    setcategorie(data.data)
  }
  return (<>
  <Helmet>
    <title>categorie</title>
  </Helmet>
    <div className='row mb-4 g-4'>
    {categorie.map((categorie)=>{
      return <div key={categorie._id} className='col-md-3 col-4 '>
      <div  className='product cursor-pointer position-relative'>
      <Link>
      <img src={categorie.image} className='categorie-img w-100' alt="" />
      <h6 className='text-center mt-3'>{categorie.name}</h6>
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
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
  </>
  )
}
