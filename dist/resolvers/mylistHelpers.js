"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.getUserFavorites = exports.checkFavourite = exports.addToFavorites = exports.getUserById = void 0;
const pg_1 = require("pg");
const myListQueries_1 = require("../queries/myListQueries");
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
        const result = await client.query(myListQueries_1.GET_USER_BY_ID, [userId]);
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
        const result = await client.query(myListQueries_1.ADD_TO_MY_LIST, [(0, uuid_1.v4)(), userId, contentId, contentType, false]);
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
        const result = await client.query(myListQueries_1.CHECK_FAVORITE, [contentId, contentType, userId]);
        const present = result.rows[0];
        console.log("Present:", present);
        if (present) {
            if (present.is_removed) {
                await client.query(myListQueries_1.UPDATE_MY_LIST, [present.id, false]);
            }
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
        const result = await client.query(myListQueries_1.GET_MY_LIST, [userId, limit, offset]);
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
        const result = await client.query(myListQueries_1.UPDATE_MY_LIST, [id, true]);
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
