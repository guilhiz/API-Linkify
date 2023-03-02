import { Router } from "express";
import { shortenUrl, getUrl, openUrl } from "../controllers/urlsController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";
import { urlSchema, listUrl, shortUrl } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", processRequestParams(listUrl), getUrl);
urlRouter.get("/urls/open/:shortUrl", processRequestParams(shortUrl), openUrl)

urlRouter.use(tokenValidate);

urlRouter.post("/urls/shorten", processRequestParams(urlSchema), shortenUrl);

export default urlRouter;
