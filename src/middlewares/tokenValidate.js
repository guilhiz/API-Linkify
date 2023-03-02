import db from "../database/database.js";
import { getUserByToken } from "../repositories/userRepository.js";

export const tokenValidate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return res.status(401).send("Faça login para continuar");
  console.log({ token: token });

  try {
    const { rows: user, rowCount } = await db.query(getUserByToken(), [token]);
    if (rowCount < 1) res.sendStatus(401);
    
    res.locals.user = user[0];
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};
