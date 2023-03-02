import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";
import { urlSchema } from "../schemas/urlSchema.js";


const urlRouter = Router()

urlRouter.use(tokenValidate)

urlRouter.post("/urls/shorten", processRequestParams(urlSchema), shortenUrl)

export default urlRouter