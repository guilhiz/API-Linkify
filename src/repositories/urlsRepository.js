export const createUrl = () => `
  INSERT INTO urls (url, short_url, user_id )
  VALUES ($1, $2, $3)
`

export const getUrlById = () => `
  SELECT * FROM urls
  WHERE id = $1;
`

export const deleteUrlById = () => `
  DELETE FROM urls
  WHERE id = $1;
`

export const incrementVisitCount =  () => `
  UPDATE urls
  SET "visitCount" = "visitCount" + 1
  WHERE id = $1;
`