 import useFetch from "../../Hooks/useFetch";
 import { FaEye ,FaPen} from "react-icons/fa6";
 import {Link} from 'react-router-dom'
// import Modal from "./Modal";
// import { useState } from "react";
 const Blogs = ()=>{
     const blogs =useFetch("https://blog-app-uylh.onrender.com/api/v1/blogs")
     console.log(blogs)
     const {loading, error, data} =blogs
    console.log(data)

    // const [toggle, setToggleModal] = useState(false)

    // const toggleModal = ()=> {setToggleModal(!toggle)};
    // const handleClose = ()=> setToggleModal(false);


    // const close= ()=> setShow(false)
    return(
        <>
        <h1 className="sm:text-5xl text-3xl text-center font-tangerine text-rose-500 font-bold">
            BLOGS
        </h1>
            <div className="min-h-screen flex flex-col sm:px-10 px-5 gap-5">
                {loading && <h1 className=" font-bold animate-pulse text-cyan-800 m-auto text-5xl">Loading ....</h1>}
                {error && <h1 className=" font-bold animate-pulse text-cyan-800 m-auto text-5xl">{error}</h1>}


                {/* <button onClick={toggleModal}>modss</button> */}

                {/* {toggle && <Modal handleClose={handleClose}/>} */}

                {
                    data && data.map((blog)=>(
                        <div key={blog._id} className="relative group flex flex-col gap-2 rounded shadow-md p-5 transition hover:shadow:xl">
                            <h1 className="font-bold text-rose-500 text-2xl"> {blog.title}</h1>
                            <p className="text-gray-500">{blog.body}</p>
                            <p className="text-gray-500">{blog.categories}</p>

                            
                            <div className="w-full flex justify-between ">
                                <p className="font-mono font-bold uppercase text-cyan-700">Author:  {blog.author}</p>
                                <p>{new Date(blog.createdAt).toLocaleString()}</p>
                            </div>

                            <div className="hidden absolute group md:group-hover:flex  w-full justify-end top-1 right-1 gap-5">
                                <Link to={`/blogs/${blog._id}`}>
                                <FaEye className="text-rose-500  text-2xl transition-all duration-150  hover:text-cyan-500" />
                                </Link>


                                <Link to={`/blogs/${blog._id}/edit`}>
                                    <FaPen className="text-rose-500  hover:text-cyan-500 text-2xl"/>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

                

                    
        
        </>
    )


    
 }



 export default Blogs