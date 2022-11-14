import React from 'react'
import "./header.css"
function Header() {
  return (
    <div className='container-fluid w-100 '>
        <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614102073832-030967418971?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')", height: 620 }}
      >
        <div className='container h-100 d-flex justify-content-center align-items-center'>
          <div className='myfont'>
            <div className='text-white'>
              <h1 className='mb-3'>The Blog</h1>
              <h4 className='mb-3'>Write what your Soul says...</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header