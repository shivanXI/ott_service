"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.getUserFavorites = exports.checkFavourite = exports.addToFavorites = exports.getUserById = void 0;
const pg_1 = require("pg");
const uuid_1 = require("uuid");
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});
// Helper functions to interact with the database
//Get user by ID
async function getUserById(userId) {
    let client;
    client = await pool.connect();
    try {
        const result = await client.query("SELECT id FROM users WHERE id = $1", [userId]);
        const user = result.rows[0];
        if (!user) {
            return null;
        }
        return user; // Cast to User type
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Re-throw for handling at the handler level
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
exports.getUserById = getUserById;
// Add to favorites list
async function addToFavorites(userId, contentId, contentType) {
    let client;
    client = await pool.connect();
    try {
        if (await checkFavourite(userId, contentId, contentType)) {
            console.log("Already added to favorites");
            return null;
        }
        const result = await client.query("INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed) VALUES ($1, $2, $3, $4, $5)", [(0, uuid_1.v4)(), userId, contentId, contentType, false]);
        return result;
    }
    catch (error) {
        console.error("Error adding to favorites:", error);
        throw error; // Re-throw for handling at the handler level
    }
    finally {
        client.release();
    }
}
exports.addToFavorites = addToFavorites;
// Check if content is already in favorites list 
async function checkFavourite(userId, contentId, contentType) {
    let client;
    client = await pool.connect();
    try {
        const result = await client.query("SELECT id FROM user_favorites WHERE content_id = $1 and content_type = $2 and user_id = $3", [contentId, contentType, userId]);
        const present = result.rows[0];
        if (present) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Re-throw for handling at the handler level
    }
    finally {
        if (client) {
            client.release();
        }
    }
}
exports.checkFavourite = checkFavourite;
// Get user's favorites with pagination from the list
async function getUserFavorites(userId, limit, offset) {
    let client;
    client = await pool.connect();
    try {
        const result = await client.query(`SELECT uf.content_type AS content_type, uf.id AS favorite_id,
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
      LIMIT $2 OFFSET $3`, [userId, limit, offset]);
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error; // Re-throw for handling at the handler level
    }
    finally {
        client.release();
    }
}
exports.getUserFavorites = getUserFavorites;
// Remove favorite from the list
async function removeFavorite(id) {
    let client;
    client = await pool.connect();
    try {
        const result = await client.query("UPDATE user_favorites SET is_removed = true WHERE id = $1", [id]);
        const removed = result?.rowCount ? (result.rowCount > 0) : false; // Check if a row was updated (removed)
        return removed;
    }
    catch (error) {
        console.error("Error removing favorite:", error);
        throw error; // Re-throw for handling at the handler level
    }
    finally {
        client.release();
    }
}
exports.removeFavorite = removeFavorite;
