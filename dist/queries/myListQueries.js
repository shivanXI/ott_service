"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER_BY_ID = exports.CHECK_FAVORITE = exports.ADD_TO_MY_LIST = exports.UPDATE_MY_LIST = exports.GET_MY_LIST = void 0;
exports.GET_MY_LIST = "SELECT uf.content_type AS content_type, uf.id AS favorite_id,\nCASE\n  WHEN uf.content_type = 'movie' THEN m.title\n  WHEN uf.content_type = 'tv_show' THEN ts.title\n  ELSE NULL\nEND AS content_title\nFROM user_favorites uf\nLEFT JOIN movies m ON uf.content_id = m.id AND uf.content_type = 'movie'\nLEFT JOIN tv_show ts ON uf.content_id = ts.id AND uf.content_type = 'tv_show'\nWHERE uf.user_id = $1 AND uf.is_removed = false\nORDER BY uf.created_at DESC\nLIMIT $2 OFFSET $3";
exports.UPDATE_MY_LIST = "UPDATE user_favorites SET is_removed = $2 WHERE id = $1";
exports.ADD_TO_MY_LIST = "INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed) VALUES ($1, $2, $3, $4, $5)";
exports.CHECK_FAVORITE = "SELECT id, is_removed FROM user_favorites WHERE content_id = $1 and content_type = $2 and user_id = $3";
exports.GET_USER_BY_ID = "SELECT id FROM users WHERE id = $1";
//# sourceMappingURL=myListQueries.js.map