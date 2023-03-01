export const createUser = () => `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
`;

export const getUserByEmail = () => `
  SELECT * FROM users
  WHERE users.email = $1
`;

export const createToken = () => `
  INSERT INTO sessions ("userId", token)
  VALUES ($1, $2);
`

export const getTokenByUserId = () => `
  SELECT * FROM sessions
  WHERE active = TRUE
  AND "userId" = $1;
`;

export const closeSessionByToken =  () => `
  UPDATE sessions
  SET active = FALSE
  WHERE token = $1;
`
