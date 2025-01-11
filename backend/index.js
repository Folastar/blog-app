import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import blogsRoute from './routes/blogRoute.js'
import authorRouter from './routes/authorRoute.js'

dotenv.config()
const app =express()
  app.use(express.json())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended:true}) )
  app.use(express.urlencoded({extended:true}))
  app.use(express.static("public"))  //uploading of media or images
  app.use(cors())


const PORT = process.env.PORT
const MONGO_URI =process.env.MONGO_URI

app.use("/api/v1/blogs", blogsRoute)
app.use("/api/v1/auth", authorRouter)
app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to your ultimate blogging server"})
})





mongoose.connect(MONGO_URI).then(()=>{console.log("youre connected to database")}).catch((err)=> {console.log(err)})
app.listen(PORT,
    ()=>{console.log(`Server is running on port ${PORT}`)}
)






app.all('*', (req,res)=>{
    res.status(404).json({message: "route not found"})
})










