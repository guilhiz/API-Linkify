import { nanoid } from "nanoid";
import internalError from "../utils/internalError.js";
import chalk from "chalk";
import db from "../database/database.js";
import {
  createUrl,
  getUrlById,
  getUrlByShortUrl,
  incrementVisitCount,
  deleteUrlById,
} from "../repositories/urlsRepository.js";

export const shortenUrl = async (req, res) => {
  const { url } = req.Params;
  const { user } = res.locals;
  const shortUrl = nanoid(8, url);
  console.log(chalk.cyan("POST /urls/shorten"));

  try {
    const { rows } = await db.query(createUrl(), [url, shortUrl, user.id]);

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

export const openUrl = async (req, res) => {
  const { shortUrl } = req.Params;
  console.log(chalk.cyan("GET /urls/open/:shortUrl"));

  try {
    const { rows, rowCount } = await db.query(getUrlByShortUrl(), [shortUrl]);
    if (rowCount < 1) return res.sendStatus(404);

    await db.query(incrementVisitCount(), [rows[0].url]);

    return res.redirect(rows[0].url);
  } catch (error) {
    internalError(error, res);
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.Params;
  const { user } = res.locals;
  console.log(chalk.cyan("delete /urls/:id"));

  try {
    const { rows: url, rowCount } = await db.query(getUrlById(), [id]);
    if (rowCount < 1) return res.sendStatus(404);


    const isUnauthorizedToDeleteUrl = url[0].userId !== user.id;
    if (isUnauthorizedToDeleteUrl) return res.sendStatus(401);

    await db.query(deleteUrlById(), [id]);

    return res.sendStatus(204);
  } catch (error) {
    internalError(error, res);
  }
};
