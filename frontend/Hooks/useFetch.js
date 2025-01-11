import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { AppContext } from "../src/context/AppContext";
const useFetch = (url, options)=>{
    const [data, setData] =useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading]= useState(null)
    const {state:{user}} = useContext(AppContext)
    
    useEffect(()=>{
         
        const fetchData = async ()=>{
            try{
                setLoading(true)
                setError(false)
                const res =await  axios.get(url, {
                    headers:{
                        "Authorization":`Bearer ${user.token}`
                    }
                })
            console.log(res.data)
            setData(res.data)
        
        }catch (err){console.log(err)
            setError(err.response.data.message||err.response.data.message||err.message)
        }
        finally{
            setLoading(false)
        }
         
        
        }
        fetchData() 
    },[url, options])

    return {data, error, loading}
    }



    export default useFetch