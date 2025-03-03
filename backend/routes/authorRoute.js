import { Router } from "express";
import { signup ,login, getProfile} from "../controllers/authorController.js";
import authenticate from "../middleware/authenticate.js";

const authorRouter = Router()


authorRouter.post('/signup', signup)

authorRouter.post("/login",login )

authorRouter.get("/profile", authenticate, getProfile)


export default authorRouter; 