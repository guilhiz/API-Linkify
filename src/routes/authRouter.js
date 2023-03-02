import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router()

authRouter.post("/signup", processRequestParams(signUpSchema), registerUser)

export default authRouter