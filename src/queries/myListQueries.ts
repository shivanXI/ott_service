export const GET_MY_LIST = `SELECT uf.content_type AS content_type, uf.id AS favorite_id,
CASE
  WHEN uf.content_type = 'movie' THEN m.title
  WHEN uf.content_type = 'tv_show' THEN ts.title
  ELSE NULL
END AS content_title
FROM user_favorites uf
LEFT JOIN movies m ON uf.content_id = m.id AND uf.content_type = 'movie'
LEFT JOIN tv_show ts ON uf.content_id = ts.id AND uf.content_type = 'tv_show'
WHERE uf.user_id = $1 AND uf.is_removed = false
ORDER BY uf.created_at DESC
LIMIT $2 OFFSET $3`;

export const UPDATE_MY_LIST = "UPDATE user_favorites SET is_removed = $2 WHERE id = $1";

export const ADD_TO_MY_LIST = "INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed) VALUES ($1, $2, $3, $4, $5)";

export const CHECK_FAVORITE = "SELECT id, is_removed FROM user_favorites WHERE content_id = $1 and content_type = $2 and user_id = $3";

export const GET_USER_BY_ID = "SELECT id FROM users WHERE id = $1";