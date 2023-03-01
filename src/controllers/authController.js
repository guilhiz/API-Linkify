import db from "../database/database.js";
import hashPassword from "../utils/hashPassword.js";
import internalError from "../utils/internalError.js";
import { valueAlreadyExistsError } from "../utils/postgresErrorCodes.js";
import { createUser } from "../repositories/userRepository.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = hashPassword(password);
  console.log(chalk.cyan("POST /users"));

  try {
    const { rowCount } = await db.query(createUser(), [name, email, encryptedPassword]);

    if (rowCount > 0) return res.sendStatus(201);

    res.sendStatus(500);
  } catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send({ error: "Email already exists" });
    }

    internalError(error, res);
  }
};
