import { Pool, PoolClient } from "pg"; 
import { User } from "../models/user";
import { GET_MY_LIST, UPDATE_MY_LIST, ADD_TO_MY_LIST, CHECK_FAVORITE, GET_USER_BY_ID } from "../queries/myListQueries";
import { v4 as uuidv4 } from "uuid";


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// Helper functions to interact with the database

//Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  let client: PoolClient;
  client = await pool.connect();
  try {
    const result = await client.query(GET_USER_BY_ID, [userId]);
    const user = result.rows[0];
    if (!user) {
      return null;
    }
    return user as User; // Cast to User type
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw for handling at the handler level
  } finally {
    if (client) {
      client.release(); 
    }
  }
}

// Add to favorites list
export async function addToFavorites(userId: string, contentId: string, contentType: string): Promise<any> {
  let client: PoolClient;
  client = await pool.connect();
  try {
    if (await checkFavourite(userId, contentId, contentType)) {
      console.log("Already added to favorites");
      return null;
    }
    const result = await client.query(
      ADD_TO_MY_LIST, [uuidv4(), userId, contentId, contentType, false]
    );
    return result;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error; // Re-throw for handling at the handler level
  } finally {
    client.release();
  }
}

// Check if content is already in favorites list 
export async function checkFavourite(userId: string, contentId: string, contentType: string): Promise<Boolean | null> {
  let client: PoolClient;
  client = await pool.connect();
  try {
    const result = await client.query(CHECK_FAVORITE, [contentId, contentType, userId]);
    const present = result.rows[0];
    console.log("Present:", present);
    if (present) {
      if (present.is_removed) {
        await client.query(UPDATE_MY_LIST, [present.id, false]);
      }
      return true;
    }
    return false; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw for handling at the handler level
  } finally {
    if (client) {
      client.release(); 
    }
  }
}

// Get user's favorites with pagination from the list
export async function getUserFavorites(userId: string, limit: number, offset: number): Promise<any[]> {
  let client: PoolClient;
  client = await pool.connect();
  try {
    const result = await client.query(
      GET_MY_LIST, [userId, limit, offset]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error; // Re-throw for handling at the handler level
  } finally {
    client.release();
  }
}

// Remove favorite from the list
export async function removeFavorite(id: string): Promise<Boolean> {
  let client: PoolClient;
  client = await pool.connect();
  try {
    const result = await client.query(
      UPDATE_MY_LIST, [id, true]
    );
    const removed = result?.rowCount ? (result.rowCount > 0) : false; // Check if a row was updated (removed)
    return removed;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error; // Re-throw for handling at the handler level
  } finally {
    client.release();
  }
}