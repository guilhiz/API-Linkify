import { Router } from "express";
import authRouter from "./authRouter.js";
import urlRouter from "./urlsRouter.js";
// import router3 from "./router3.js";

const router = Router()
 router.use(authRouter)
 router.use(urlRouter)
// router.use(router3)

export default router