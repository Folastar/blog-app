import {useParams, useNavigate,Link} from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import { toast } from 'react-toastify'
import axios from 'axios'
const BlogDetails = () => {
    
    const {_id} = useParams()
    const history = useNavigate()
    
    
    const handleDelete =async ()=>{
        
        try{
            const  sure = confirm("do you want to delete blog?")
            if(sure){
                const res= await axios.delete(`https://blog-app-uylh.onrender.com/api/v1/blogs/${_id}`)
                
                if(res.status === 201){
                    toast.success("Blog deleted successfully ")
                    history("/blogs")
                    
                }
                
            }
        }
        catch(err){
            console.log(err)
            toast.error("Failed to delete blog")
        }
        // console.log(response.data.blog)
        // setFormData("")
    }
    const blog =useFetch(`https://blog-app-uylh.onrender.com/api/v1/blogs/${_id}`)
    console.log(blog)
    const {loading,data,error} =blog;
   
    
    if(loading){
        return <div className='text-7xl font-bold text-rose-500 font-tangerine grid place-content-center h-screen'>Loading...</div>
    }
    
    if(error){
        return <div className='text-7xl font-bold text-red-500 font-tangerine grid place-content-center h-screen'>An error occured</div>
    }
    
    return ( <>
        <div className='min-h-screen p-10 relative'>


            <button onClick={()=>history("/blogs")} className='px-5 py-2 italic text-cyan-800 underline text-sm'>Go Back</button>
            {data?.blog&&(<div >
                <h1 className='font-bold uppercase text-3xl text-center'>{data.blog.title}</h1>
                <p className='p-10 bg-slate-300 rounded-md my-5'>{data.blog.body}</p>
                <p className='font-mon capitalize text-gray-700 my-2'>🐛{data.blog.categories}</p>
                <p className='font-tangerine font-bold uppercase text-cyan-700 my-4'>{data.blog.author}</p>


                <div className='flex justify-between items-center flex-col sm:flex-row'>
                    <p><span className='font-bold font-mono text-cyan-700 underline'>Created:</span>{new Date(data.blog.createdAt).toLocaleString()}</p>
                    <p><span  className='font-bold font-mono text-cyan-700 underline'>Updated:</span>{new Date(data.blog.createdAt).toLocaleString()}</p>

                </div>
                <div className='flex justify-center gap-3'>
                    <Link className='bg-yellow-700 px-4 py-1 rounded-md text-white' to={`/blogs/${_id}/edit`}>Update Blog</Link>
                    <button onClick={handleDelete} className='bg-rose-700 px-4 py-1 rounded-md text-white'>Delete Post</button>


                </div>

            </div>)}
        </div>
    </> );

}
 
export default BlogDetails;