import React from 'react'
import { useState } from 'react';
import './modal.css'

const Modal = ({handleClose}) => {

    const [show, setShow] = useState(false)
    const [title, setTitle]= useState("")
    const [author, setAuthor]= useState("")
    const [categories, setCategories]= useState("")
    const [body, setBody]= useState("")


    // const handleOpen = ()=> setShow(true);
    // const handleClose = ()=> setShow(false);

    const handleSubmit =(e)=>{
        e.preventDefault()
    }
  return (

   <>
   <div className='w-1/2 h-1/2 bg-black absolute flex-col  top-40 left-80  flex justify-center  items-center'>
        
        <button onClick={handleClose} className=' p-5 absolute top-0 right-0   text-3xl  hover:text-red-600/95'>
            X
        </button>

        <h1 className='py-4 font-mono text-3xl'>POST BLOGS</h1>
        <form onSubmit={handleSubmit}  className='grid gap-x-9 grid-cols-2'>

            <div className="form-control">
                <label >Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}}  className='' type="text" />
            </div>

            <div className="form-control">
                <label>Author</label>
                <input onChange={(e)=>{setAuthor(e.target.value)}}  className='' type="text" />
            </div>

            <div className="form-control">
                <label>Categories</label>
                <select className='p-1 w-full bg-slate-200' name="" id="categories">
                    <option value="sport">Sports</option>
                    <option value="sport">Politics</option>
                    <option value="sport">Technology</option>
                    <option value="sport">Economics</option>


                    

                </select>
            </div>

            <div className="form-control">
                <label>Body</label>
                <input onChange={(e)=>{setBody(e.target.value)}}  className='' type="text" />
            </div>

            <button className='px-5 py-2 bg-red-600 col-span-2 text-white ' type='submit'>post</button>
        </form>
    
    
    </div> 
   
   </>
  )
}

export default Modal
