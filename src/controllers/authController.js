import db from "../database/database.js";
import bcrypt from "bcrypt"
import chalk from "chalk";
import hashPassword from "../utils/hashPassword.js";
import internalError from "../utils/internalError.js";
import { valueAlreadyExistsError } from "../utils/postgresErrorCodes.js";
import { v4 as uuid } from "uuid";
import { createUser, getUserByEmail, createToken } from "../repositories/userRepository.js";

export const signUp = async (req, res) => {
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

export const signIn = async (req, res) => {
  const { email, password } = req.Params;
  console.log(email, password);
  const token = uuid();

  try {
    const { rows: user } = await db.query(getUserByEmail(), [email]);
    const encryptedPassword = user[0].password;
    const match = bcrypt.compareSync(password, encryptedPassword);

    if (user.length < 1 || !match) {
      return res.status(401).send("verifique se os dados foram inseridos corretamente");
    }

    await db.query(createToken(), [user[0].id, token]);

    return res.status(200).send({ token: token });
  } catch (error) {
    internalError(error, res);
  }
};
