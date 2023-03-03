export const createUrl = () => `
  INSERT INTO urls (url, "shortUrl", "userId" )
  VALUES ($1, $2, $3)
  RETURNING id
`;

export const getUrlById = () => `
  SELECT * FROM urls
  WHERE id = $1;
`;
export const getUrlByShortUrl = () => `
  SELECT * FROM urls
  WHERE "shortUrl" = $1;
`;

export const deleteUrlById = () => `
  DELETE FROM urls
  WHERE id = $1;
`;

export const incrementVisitCount = () => `
  UPDATE urls
  SET "visitCount" = "visitCount" + 1
  WHERE url = $1;
`;

export const getUrlStatisticsByUserId = () => `
SELECT users.id, users.name,
SUM(urls."visitCount") as "visitCount",
json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) as "shortenedUrls"
FROM urls
JOIN users ON urls."userId" = users.id
WHERE users.id = $1
GROUP BY users.id, users.name
`;

export const getTopRankedUsers = () => `
SELECT users.id, users.name, count(urls.id) AS "linksCount",
coalesce(sum(urls."visitCount"),0) AS "visitCount"
FROM users
LEFT JOIN urls ON users.id = urls."userId"
GROUP BY users.id, users.name
ORDER BY "visitCount" DESC
LIMIT 10
`;
