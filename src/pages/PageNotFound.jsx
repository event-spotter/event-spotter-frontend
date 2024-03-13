import React from 'react'
import errorPage from '../assets/404page.gif'
import { Link } from 'react-router-dom';



function PageNotFound() {
  return (
    <div className='flex  flex-col items-center mb-36' id="wrapper">
      <img style={{maxWidth:'600px'}} src={errorPage} alt='man seeing a 404 sign'/>
     
      <div id="info">
        <h1 style={{fontSize:'2.75em', fontWeight:'lighter' }}>Page not found</h1>
        <Link to={'/'}>
          <h3 style={{fontWeight:'lighter', textAlign: 'center'}}>Go back</h3>
        </Link>
      </div>
    </div >
  )
}

export default PageNotFound