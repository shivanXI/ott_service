"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFavourite = exports.addToFavorites = exports.getUserById = void 0;
// src/resolvers/user.ts
const pg_1 = require("pg"); // Adjust import based on your database library
const uuid_1 = require("uuid");
// Replace with your actual database connection details
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});
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
