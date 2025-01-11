import { Router } from "express";
import { createBlogs, deleteBlog, getBlogs, getSingle, updateBlog } from "../controllers/blogController.js";
import authenticate  from "../middleware/authenticate.js";

const blogsRoute =Router()


blogsRoute.get("/", authenticate, getBlogs)

blogsRoute.get("/:id", authenticate, getSingle)


blogsRoute.post("/", authenticate, createBlogs)


blogsRoute.patch("/:id", authenticate, updateBlog)

blogsRoute.delete("/:id", authenticate, deleteBlog  )


export default blogsRoute