import Author from "../models/authorModel.js"
import jwt from 'jsonwebtoken'

const authenticate = async(req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"You must be logged in to access this route"})
    }

    const token = authorization.split(" ")[1]

    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const author = await Author.findById(id)

        if(!author){
            return res.status(401).json({error:"you must be logged in to access this route"})
        }

        req.author=author

        next() //you must use it in middleware
    }
    catch(err){
        res.status(401).json({err:"you must be logged in to access this route"})
    }

}


export default authenticate