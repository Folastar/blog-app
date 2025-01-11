import jwt from "jsonwebtoken";
import Author from "../models/authorModel.js";
const genToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"7d"}) //takes in three variables id , secret and time
}
export const signup =async(req,res)=>{
    const {first_name, last_name, username, email, password} =req.body
    try{
        const author = await  Author.signUp(first_name, last_name, username,  email, password)
        res.status(201).json({author, token:genToken(author._id)})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}


export const login =async (req,res)=>{
    const {username ,password}= req.body

    try{
        const author= await Author.login(username,password)
        res.status(200).json({author, token:genToken(author._id)})

    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

 export const getProfile = async(req,res)=>{
    const {_id} =req.author //this gives you everything in the author body

    try{
        const author = await Author.findById(_id);
        res.status(200).json(author)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}