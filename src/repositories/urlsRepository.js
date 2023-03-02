export const createUrl = () => `
  INSERT INTO urls (url, "shortUrl", "userId" )
  VALUES ($1, $2, $3)
  RETURNING id
`

export const getUrlById = () => `
  SELECT * FROM urls
  WHERE id = $1;
`
export const getUrlByShortUrl = () => `
  SELECT * FROM urls
  WHERE "shortUrl" = $1;
`

export const deleteUrlById = () => `
  DELETE FROM urls
  WHERE id = $1;
`

export const incrementVisitCount =  () => `
  UPDATE urls
  SET "visitCount" = "visitCount" + 1
  WHERE url = $1;
`