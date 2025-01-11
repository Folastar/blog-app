
import mongoose from "mongoose";
import Blog from "../models/blogModel.js";


export const createBlogs =async (req,res)=>{
    const {title, body,author, categories}= req.body;

    if(!title || !body || !author || !categories){
        return res.status(400).json({message: "all fields are required"})
    }
    try{
        const blog = await Blog.create(req.body)
        res.status(201).json({blog})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}


export const getBlogs = async(req, res)=>{    

    try{
        const blog =await Blog.find().sort({createdAt: -1})
        res.status(201).json(blog)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}


export const getSingle= async(req,res)=>{
    const {id} =req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(400).json({msg:"not a valid id "})
    }
    try{
        const blog = await Blog.findById(id)
        res.status(201).json({blog})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


export const updateBlog = async(req,res)=>{
    const {id} =req.params
    const {title, body,author, categories}= req.body;


    
    
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"not a valid id"})
        }

        const blog = await Blog.findById(id)

        const newBlog =await Blog.findByIdAndUpdate(id,{
            title:title|| blog.title,
            body:body || blog.body,
            author:author|| blog.author,
            categories: categories|| blog.categories,

        }, {title,body, author, categories}, {new:true})
        res.status(200).json(newBlog)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}



export const deleteBlog = async(req,res)=>{
    const {id} =req.params
    
    
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"not a valid id"})
        }
        const blog =await Blog.findByIdAndDelete(id)
        
        if(!blog){
            return res.status(400).json({message:"NOT FOUND"})
        }
        res.status(201).json({message:"blog deleted successfuly"})
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

   