import db from "../database/database.js";
import chalk from "chalk";
import hashPassword from "../utils/hashPassword.js";
import internalError from "../utils/internalError.js";
import { valueAlreadyExistsError } from "../utils/postgresErrorCodes.js";
import { v4 as uuid } from 'uuid';
import { createUser } from "../repositories/userRepository.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.Params;
  const encryptedPassword = hashPassword(password);
  console.log(chalk.cyan("POST /users"));

  try {
     await db.query(createUser(), [name, email, encryptedPassword]);

    return res.sendStatus(201);
  } catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send({ error: "Email already exists" });
    }

    internalError(error, res);
  }
};
