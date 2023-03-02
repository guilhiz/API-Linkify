import { Router } from "express";
import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlsController.js";
import processRequestParams from "../middlewares/processRequestParams.js";
import { tokenValidate } from "../middlewares/tokenValidate.js";
import { urlSchema, idSchema, shortUrlSchema } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", processRequestParams(idSchema), getUrl);
urlRouter.get("/urls/open/:shortUrl", processRequestParams(shortUrlSchema), openUrl)

urlRouter.use(tokenValidate);

urlRouter.post("/urls/shorten", processRequestParams(urlSchema), shortenUrl);
urlRouter.delete("/urls/:id", processRequestParams(idSchema), deleteUrl)
export default urlRouter;
