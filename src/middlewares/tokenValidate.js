export const tokenValidate = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) return res.status(401).send("Faça login para continuar");
  console.log({token: token})
  try {
    res.locals.token = token;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};