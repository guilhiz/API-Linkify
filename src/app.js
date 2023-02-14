import express, { json } from "express";
import router from "./routes/index.js";
import * as dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.green(`Server running in port: ${port}`));
});
