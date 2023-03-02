import { nanoid } from "nanoid";
import internalError from "../utils/internalError.js";
import chalk from "chalk";
import db from "../database/database.js";
import { getUserIdByToken } from "../repositories/userRepository.js";
import { createUrl, getUrlById } from "../repositories/urlsRepository.js";

export const shortenUrl = async (req, res) => {
  const { url } = req.Params;
  const { token } = res.locals;
  const shortUrl = nanoid(8, url);
  console.log(chalk.cyan("POST /urls/shorten"));

  try {
    const { rows: user } = await db.query(getUserIdByToken(), [token]);

    const { rows } = await db.query(createUrl(), [url, shortUrl, user[0].userId]);

    return res.status(201).send({ id: rows[0].id, shortUrl });
  } catch (error) {
    internalError(error, res);
  }
};

export const getUrl = async (req, res) => {
  const { id } = req.Params;
  console.log(chalk.cyan("GET /urls/:id"));

  try {
    const { rows: url } = await db.query(getUrlById(), [id]);

    return res.status(200).send({ id: url[0].id, shortUrl: url[0].shortUrl, url: url[0].url });
  } catch (error) {
    internalError(error, res);
  }
};
