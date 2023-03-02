import { Router } from "express";
import authRouter from "./authRouter.js";
// import router2 from "./router2.js";
// import router3 from "./router3.js";

const router = Router()
 router.use(authRouter)
// router.use(router2)
// router.use(router3)

export default router