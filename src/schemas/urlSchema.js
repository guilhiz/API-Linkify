import Joi from "joi";

export const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export const idSchema = Joi.object({
  id: Joi.string().required().min(1),
});

export const shortUrlSchema = Joi.object({
  shortUrl: Joi.string().required(),
});
