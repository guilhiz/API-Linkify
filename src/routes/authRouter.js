import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";

const authRouter = Router()

authRouter.post("/signup", processRequestParams(signUpSchema), signUp)

authRouter.post("/signin", processRequestParams(signInSchema), signIn)

export default authRouter