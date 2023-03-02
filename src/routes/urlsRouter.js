import { Router } from "express";
import { shortenUrl, getUrl } from "../controllers/urlsController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";
import { urlSchema, listUrl } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", processRequestParams(listUrl), getUrl);

urlRouter.use(tokenValidate);

urlRouter.post("/urls/shorten", processRequestParams(urlSchema), shortenUrl);

export default urlRouter;
