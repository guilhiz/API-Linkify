import db from "../database/database.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';
import { createUser } from "../repositories/userRepository.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  console.log(chalk.cyan('POST /users'));

  try {
    const { rowCount } = await db.query(createUser(), [name, email, encryptedPassword]);

    if (rowCount > 0) return res.sendStatus(201);

    res.sendStatus(500);
  } catch (error) {
    if (error.constraint === "users_email_key") return res.status(409).send({ error: "Email already exists" });
    return res.status(500);
  }
};
